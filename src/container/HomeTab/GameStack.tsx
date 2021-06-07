import React, { useEffect, useState } from 'react'
import { DefaultAlert } from '../../atoms'
import CampaignView from '../../components/GamePlayStack/CampaignView'
import { Campaign, MemberCoordinate, PinPoint, PlayingCampaign, SearchCampaign } from '@types';
import { API } from '../../api';
import { mainNavigation, useAuthContext, useLoadingContext } from '../../useHook';
import PinPointPanel from '../../components/GamePlayStack/PinpointPanel';
import PlayingCampaignModal from '../../components/GamePlayStack/PlayingCampaignModal';
import { View } from 'react-native';
import { getDistance } from 'geolib';
import { useIsFocused } from '@react-navigation/core';
import RecommendCampaignModal from '../../components/GamePlayStack/RecommendCampaignModal';


const GameStack = () => {
    const { auth: { userToken } } = useAuthContext();
    if (userToken === undefined) return <></>

    const mainNav = mainNavigation();
    const isFocused = useIsFocused()
    const { useLoading: { startLoading, endLoading } } = useLoadingContext();

    const [coordinate, setCoordinate] = useState<MemberCoordinate>(userToken.coords);

    const [playingCampaignList, setPlayingCampaignList] = useState<PlayingCampaign[]>([]); // 참여중인 모든 캠페인 리스트
    const [playingPinPointList, setPlayingPinPointList] = useState<PinPoint[]>([]); // 참여중인 모든 핀포인트 리스트
    const [clearedPinPointList, setClearedPinPointList] = useState<string[]>([]); // 참여중 클리어된 핀포인트 리스트
    // PlayingCampaignModal에서 초기화 된다.
    const [displayPinPointList, setDisplayPinPointList] = useState<PinPoint[]>([]); // 사용자가 플레이할 캠페인의 핀포인트 리스트
    const [recommendCampaignList, setRecommendCampaignList] = useState<SearchCampaign[]>([]);

    // PinPoint Panel의 데이터
    const [isPanelActive, setIsPanelActive] = useState(false);
    const [pinPoint, setPinPoint] = useState<PinPoint>();
    const [campaign, setCampaign] = useState<SearchCampaign>();

    //// api
    // 참여중인 캠페인의 모든 핀포인트를 가져옴 
    const getAllPlayingCampaigns = async () => {
        const { result, data, error, errdesc } = await API.memberPlayingCampaign(userToken.id);
        if (result === "failed" || data === undefined)
            return DefaultAlert({ title: "참여중인 캠페인 가져오기 실패", subTitle: `${error} ${errdesc}` })

        setPlayingCampaignList(data)
    }

    const getAllPlayingPinPoints = async () => {
        const { result, data, error, errdesc } = await API.memberPlayingPinPoint()

        if (result === "failed" || data === undefined)
            return DefaultAlert({ title: "참여중인 캠페인이 없습니다.", subTitle: `${error} ${errdesc}` })

        setClearedPinPointList(data.clearedPinpoints)
        setPlayingPinPointList(data.pinpoints)
    }

    const getRecommendCampaign = async () => {
        const res = await API.getRegion(userToken.coords)
        if (res === undefined)
            return DefaultAlert({ title: "주소를 찾을 수 없습니다." })

        const fullAddress = res.results[0].formatted_address
        const splitAddress = fullAddress.split(" ");
        const address = splitAddress[1].charAt(splitAddress.length - 1) === "시" ? splitAddress[1] : splitAddress[2]

        const { result, data, error, errdesc } = await API.campaignRecommend(address);
        if (result === "failed" || data === undefined)
            return DefaultAlert({ title: "근처에 추천할만한 캠페인이 없습니다.", btColor: "cancel" })
        setRecommendCampaignList(data)
    }

    useEffect(() => {
        setIsPanelActive(false)
        getAllPlayingCampaigns();
        getAllPlayingPinPoints();
    }, [isFocused])

    const openPanel = (pinPoint: PinPoint) => {
        const init = async () => {
            const { result, data, error, errdesc } = await API.campaignSearchPinPoint(pinPoint.id);

            if (result === "failed" || data === undefined)
                return DefaultAlert({ title: "캠페인 가져오기 실패", subTitle: `${error} ${errdesc}` })

            setCampaign(data)
            setPinPoint(pinPoint);
            setIsPanelActive(true);
        }
        init();
    };

    //// naviagtion
    const navtoPinPointDetail = (pinpoint: PinPoint) => {
        if (campaign === undefined) return

        mainNav.navigate("ModalNav", {
            screen: "PinPointDetailStack",
            params: { cid: campaign.id, campaignName: campaign.name, pinpoint: pinpoint }
        })
    }

    const navtoCampaignDetail = (campaign: SearchCampaign) => {
        mainNav.navigate("ModalNav", {
            screen: "CampaignDetailStack",
            params: { campaign }
        })
    }

    const navtoQuiz = async (pinpoint: PinPoint) => {
        if (campaign === undefined) return;

        const caid = campaign.id
        startLoading()
        // 위치 정보 가져오기
        const { coords } = await API.getCoordinate()
        if (coords === undefined)
            return DefaultAlert({ title: "사용자 위치를 찾을 수 없음", subTitle: "Can't find you😥", onPress: endLoading },)

        // 30m 거리 
        const distance = getDistance(
            { latitude: coords.latitude, longitude: coords.longitude },
            { latitude: pinpoint.latitude, longitude: pinpoint.longitude }
        )
        if (distance > 30)
            return DefaultAlert({ title: "핀포인트와 거리가 너무 멉니다", subTitle: '30m 이내여야 합니다😥', onPress: endLoading })

        // 퀴즈 참여가능 여부
        const { result, data, error, errdesc } = await API.quizCheck({ pid: pinpoint.id, caid })
        if (result === "failed" || data === undefined)
            return DefaultAlert({ title: "도전이 불가합니다", subTitle: errdesc, onPress: endLoading })

        endLoading()
        mainNav.navigate("GameNav", {
            screen: "QuizStack",
            params: { caid, pid: pinpoint.id, quiz: pinpoint.quiz }
        })
    }


    return (
        <View>
            <CampaignView
                coordinate={coordinate}
                openPanel={openPanel}
                pinPointList={displayPinPointList}
                clearedPinPointList={clearedPinPointList}
            />

            <PlayingCampaignModal
                playingCampaignList={playingCampaignList}
                playingPinPointList={playingPinPointList}
                useDisplayPinPointList={[displayPinPointList, setDisplayPinPointList]}
                getAllPlayingPinPoints={getAllPlayingPinPoints}
                getAllPlayingCampaigns={getAllPlayingCampaigns}
                navtoCampaignDetail={navtoCampaignDetail}
            />

            <RecommendCampaignModal
                recommendCampaignList={recommendCampaignList}
                getRecommendCampaign={getRecommendCampaign}
                navtoCampaignDetail={navtoCampaignDetail}
            />

            <PinPointPanel
                campaign={campaign}
                pinPoint={pinPoint}
                clearedPinPointList={clearedPinPointList}
                usePanelActivie={[isPanelActive, setIsPanelActive]}
                navtoPinPointDetail={navtoPinPointDetail}
                navtoCampaignDetail={navtoCampaignDetail}
                navtoQuiz={navtoQuiz}
            />
        </View>
    )
}

export default GameStack