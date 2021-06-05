import React, { useEffect, useState } from 'react'
import { DefaultAlert } from '../../atoms'
import CampaignView from '../../components/GamePlayStack/CampaignView'
import { Campaign, MemberCoordinate, PinPoint, PlayingCampaign, SearchCampaign } from '@types';
import { API } from '../../api';
import { mainNavigation, useAuthContext, useLoadingContext } from '../../useHook';
import PinPointPanel from '../../components/GamePlayStack/PinpointPanel';
import PlayingCampaignModal from '../../components/GamePlayStack/PlayingCampaignModal';
import { View, StyleSheet } from 'react-native';
import { getDistance } from 'geolib';

interface Props {

}

const GamePlayStack = (props: Props) => {
    const mainNav = mainNavigation();

    const { useLoading: { startLoading, endLoading } } = useLoadingContext();
    const { auth: { userToken } } = useAuthContext();
    if (userToken === undefined) return <></>
    const [coordinate, setCoordinate] = useState<MemberCoordinate>(userToken.coords);
    const [isPanelActive, setIsPanelActive] = useState(false);
    const [playingCampaignList, setPlayingCampaignList] = useState<PlayingCampaign[]>([]); // 참여중인 모든 캠페인 리스트
    const [playingPinPointList, setPlayingPinPointList] = useState<PinPoint[]>([]); // 참여중인 모든 핀포인트 리스트
    const [clearedPinPointList, setClearedPinPointList] = useState<string[]>([]); // 클리어된 핀포인트 리스트
    const [pinPointList, setPinPointList] = useState<PinPoint[]>([]); // 사용자가 플레이할 캠페인의 핀포인트 리스트
    const [pinPoint, setPinPoint] = useState<PinPoint>();
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [cam, setCam] = useState<SearchCampaign>();


    const openPanel = async (pinPoint: PinPoint) => {
        setPinPoint(pinPoint);
        const { result, data, error, errdesc } = await API.campaignSearchOne({ condition: "exact", type: 'pinpoint', value: pinPoint.id });
        // console.log(pinPoint);
        // console.log(data);
        if (result === "failed" || data === undefined)
            return DefaultAlert({ title: "캠페인 가져오기 실패", subTitle: `${error} ${errdesc}` })

        setCam(data)
        setIsPanelActive(true);
    };

    // 참여중인 캠페인의 모든 핀포인트를 가져옴 
    const getAllPlayingCampaigns = async () => {
        if (userToken === undefined)
            return;
        const { result, data, error, errdesc } = await API.memberPlayingCampaign(userToken.id);
        console.log(userToken.coords?.latitude)
        if (result === "failed" || data === undefined)
            return DefaultAlert({ title: "참여중인 캠페인 가져오기 실패", subTitle: `${error} ${errdesc}` })

        setPlayingCampaignList([...data])




    }

    const getAllPlayingPinPoints = async () => {
        setIsPlaying(false)
        const { result, data, error, errdesc } = await API.memberPlayingPinPoint()
        console.log(data)
        if (result === "failed" || data === undefined)
            return DefaultAlert({ title: "참여중인 캠페인이 없습니다.", subTitle: `${error} ${errdesc}` })


        console.log(data.clearedPinpoints)
        setPlayingPinPointList([...data.pinpoints])
        setClearedPinPointList(data.clearedPinpoints)
        return DefaultAlert({ title: "참여중인 캠페인 가져오기 완료", btColor: "cancel"})


    }

    // 플레이할 캠페인을 선택하여 핀포인트를 가져옴
    const SelectPlayingCampaign = async (cid: string) => {
        const { result, data, error, errdesc } = await API.pinPointRead({ type: 'list', value: cid })
        
        if (result === "failed" || data === undefined)
            return DefaultAlert({ title: "핀포인트 가져오기 실패", subTitle: `${error} ${errdesc}` })

        const isTrue = data.some((pinpoint, idx) => {
            const distance = getDistance(
                { latitude: pinpoint.latitude, longitude: pinpoint.longitude },
                { latitude: userToken.coords.latitude, longitude: userToken.coords.longitude })
            if (distance < 100) return true


        })

        if (isTrue) {
            setPinPointList([...data])
            setIsPlaying(true)
            return DefaultAlert({ title: "핀포인트 탐험 시작!🚶‍♂️", btColor: "cancel"})

        }
        else return DefaultAlert({ title: "캠페인 거리가 너무 멉니다", subTitle: '100m 이내여야 합니다😥', btColor: "cancel"})

    }

    const navtoPinPointDetail = (pinpoint: PinPoint) => {

        // gameNav.navigate('GamePinPointDetailStack', { pinpoint, campaignName: cam?.name })
        if (cam !== undefined)
            mainNav.navigate("ModalNav", {
                screen: "PinPointDetailStack",
                params: { cid: cam.id, campaignName: cam.name, pinpoint: pinpoint }
            })
    }

    const navtoGame = async (pinpoint: PinPoint) => {
        
        if (isPlaying === false) {

            return DefaultAlert({ title: "게임 플레이중이 아닙니다", subTitle: "먼저 캠페인을 선택해 주세요😁" })

        } else if (clearedPinPointList.includes(pinpoint.id)) {

            return DefaultAlert({ title: "이미 클리어한 핀포인트 입니다", subTitle: "클리어하지 않은 핀포인트를 선택해주세요😁" })

        } else {
            startLoading()
            const { coords } = await API.getCoordinate()
            
            if (coords === undefined) {
                endLoading()
                return DefaultAlert({ title: "사용자 위치를 찾을 수 없음", subTitle: "Can't find you😥" })
            }

            const distance = getDistance(
                { latitude: coords.latitude, longitude: coords.longitude },
                { latitude: pinpoint.latitude, longitude: pinpoint.longitude })

            if (distance < 30 && cam !==undefined) {
                endLoading()
                mainNav.navigate("GameNav", {
                    screen: "QuizStack",
                    params: { caid: cam.id, campaignName: cam.name, pinpoint: pinpoint }
                })
               
            }else{
                endLoading()
               return DefaultAlert({ title: "핀포인트와 거리가 너무 멉니다", subTitle: '30m 이내여야 합니다😥' })
                
                
            }

            
        }

        
    }



    useEffect(() => {
        getAllPlayingCampaigns();
        getAllPlayingPinPoints();

    }, [])



    return (

        <View>
            <CampaignView
                coordinate={coordinate}
                openPanel={openPanel}
                pinPointList={pinPointList}
                playingPinPointList={playingPinPointList}
                clearedPinPointList={clearedPinPointList}
                isPlaying={isPlaying}

            />
            <View style={styles.icon}>
                <PlayingCampaignModal
                    playingCampaignList={playingCampaignList}
                    SelectPlayingCampaign={SelectPlayingCampaign}
                    getAllPlayingPinPoints={getAllPlayingPinPoints}
                />
            </View>

            <PinPointPanel
                pinPoint={pinPoint}
                navtoPinPointDetail={navtoPinPointDetail}
                navtoGame={navtoGame}
                usePanelActivie={[isPanelActive, setIsPanelActive]}
            />
        </View>
    )
}

export default GamePlayStack

const styles = StyleSheet.create({
    //icon
    icon: {
        position: 'absolute',
        alignSelf: 'flex-end',
        marginTop: 10,
        paddingRight: 10
    }
});