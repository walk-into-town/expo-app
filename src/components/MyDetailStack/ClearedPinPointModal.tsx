import { PlayingCampaign } from '@types';
import { PinPoint, TuseState } from '@types'
import React, { useEffect, useState } from 'react'
import { Avatar, Card, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { SubTitle, Text3, Title } from '../../atoms';
import { mainNavigation } from '../../useHook';

interface Props {
    useIsVisble: TuseState<boolean>
    campaign: PlayingCampaign | undefined
    getPinpoints: (caid: string) => Promise<PinPoint[] | undefined>
}

const ClearedPinPointModal = (props: Props) => {
    const { campaign } = props
    if (campaign === undefined) return <></>

    const mainNav = mainNavigation()
    const [isVisible, setIsVisible] = props.useIsVisble
    const [pinpointList, setPinpointList] = useState<PinPoint[]>([])
    const [clearedPinpointList, setClearedPinpointList] = useState<PinPoint[]>([])

    // api
    useEffect(() => {
        if (isVisible)
            getData();
    }, [isVisible])

    const getData = () => {
        const init = async () => {
            const data = await props.getPinpoints(campaign.id)
            if (data) {
                setPinpointList(data)
                setClearedPinpointList(data.filter(v => campaign.clearedPinpoints.some(id => id === v.id)))
            }
        }
        init();
    }

    //usecase
    const navToPinPoint = (v: PinPoint) => {
        setIsVisible(false)
        mainNav.navigate("ModalNav", { screen: "PinPointDetailStack", params: { pinpoint: v, cid: campaign.id, campaignName: campaign.name } })
    }

    // render
    const renderItem = (v: PinPoint) => (
        <ListItem key={v.id} onPress={() => navToPinPoint(v)} style={{ borderRadius: 10, margin: 4 }}>
            <Avatar source={{ uri: v.imgs[0] || "dummy" }} rounded />
            <ListItem.Content>
                <Text3>{v.name}</Text3>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    )

    return (
        <Modal isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
            <Card containerStyle={{ borderRadius: 20 }}>
                <Title>{campaign.name}</Title>
                <ScrollView style={{ height: 400, paddingTop: 4 }} bounces={false} showsVerticalScrollIndicator={false}>
                    <SubTitle style={{ margin: 4 }}>클리어한 핀포인트 {clearedPinpointList.length}개</SubTitle>
                    {
                        clearedPinpointList.map((v) => renderItem(v))
                    }
                    <SubTitle style={{ margin: 4 }}>
                        남은 핀포인트 {pinpointList.length - clearedPinpointList.length}개
                    </SubTitle>
                    {
                        pinpointList
                            .filter(v => !clearedPinpointList.some(pin => pin.id == v.id))
                            .map((v) => renderItem(v))
                    }
                </ScrollView>
            </Card>
        </Modal>
    )
}
export default ClearedPinPointModal
