import React, { useEffect, useState } from 'react'
import { Container, ScrollWrapper, DefaultAlert } from '../../atoms'
import CampaignView from '../../components/GamePlayStack/CampaignView'
import { Campaign, PinPoint, PlayingCampaign, SearchCampaign } from '@types';
import { API } from '../../api';
import { gameNavigation, modalNavigation, useAuthContext } from '../../useHook';
import Game from '../../components/QuizStack/Game'
import PinPointPanel from '../../components/GamePlayStack/PinpointPanel';
import PlayingCampaignModal from '../../components/GamePlayStack/PlayingCampaignModal';
import { View, StyleSheet } from 'react-native';

interface Props {

}

const GamePlayStack = (props: Props) => {
    const modalNav = modalNavigation();
    const gameNav = gameNavigation();

    const { auth: { userToken } } = useAuthContext();
    const [isPanelActive, setIsPanelActive] = useState(false);
    const [playingCampaignList, setPlayingCampaignList] = useState<PlayingCampaign[]>([]);
    const [pinPointList, setPinPointList] = useState<PinPoint[]>([]);
    const [pinPoint,setPinPoint] = useState<PinPoint>();
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [cam, setCam] = useState<SearchCampaign>();
    

    const openPanel = async(pinPoint:PinPoint) => {
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

        if (result === "failed" || data === undefined)
            return DefaultAlert({ title: "참여중인 캠페인 가져오기 실패", subTitle: `${error} ${errdesc}` })

        setPlayingCampaignList([...data])




    }

    const getAllPlayingCampaignPinPoints = async () => {

        const { result, data, error, errdesc } = await API.memberPlayingCampaignPinpoint()
        console.log(data)
        if (result === "failed" || data === undefined)
            return DefaultAlert({ title: "참여중인 캠페인이 없습니다.", subTitle: `${error} ${errdesc}` })

        setPinPointList([...data])


    }

    // 플레이할 캠페인을 선택하여 핀포인트를 가져옴
    const SelectPlayingCampaign = async (cid: string) => {

        const { result, data, error, errdesc } = await API.pinPointRead({ type: 'list', value: cid })
        if (result === "failed" || data === undefined)
            return DefaultAlert({ title: "핀포인트 가져오기 실패", subTitle: `${error} ${errdesc}` })

        setPinPointList([...data])
    }

    const navtoPinPointDetail = (pinpoint: PinPoint) => {

        gameNav.navigate('GamePinPointDetailStack', { pinpoint, campaignName: cam?.name})
    }



    useEffect(() => {
        getAllPlayingCampaigns();
        getAllPlayingCampaignPinPoints();

    }, [])



    return (
        // <ScrollWrapper>
        //     <Game />
        // </ScrollWrapper>
        <Container>
            <CampaignView
                openPanel={openPanel}
                pinPointList={pinPointList}
            />
            <View style={styles.icon}>
                <PlayingCampaignModal
                    playingCampaignList={playingCampaignList}
                    SelectPlayingCampaign={SelectPlayingCampaign}
                />
            </View>

            <PinPointPanel
                pinPoint={pinPoint}
                navtoPinPointDetail = {navtoPinPointDetail}
                usePanelActivie={[isPanelActive, setIsPanelActive]}
            />
        </Container>
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