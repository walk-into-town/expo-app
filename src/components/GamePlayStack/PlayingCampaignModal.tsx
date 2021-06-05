import { Campaign, PinPoint, PlayingCampaign, TuseState } from '@types';
import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { BadgeButton, colorCode, Ionicons, Title, TitleBadge, Container, Row, FontAwesome, Text3, Text1, ClearButton } from '../../atoms';
import { ListItem } from 'react-native-elements';
import { getDistance } from 'geolib';
import { useAuthContext } from '../../useHook';


interface Props {
    playingCampaignList: PlayingCampaign[],
    playingPinPointList: PinPoint[],
    useDisplayPinPointList: TuseState<PinPoint[]>
    getAllPlayingPinPoints: () => Promise<void>
}

const PlayingCampaignModal = ({ playingCampaignList, playingPinPointList, useDisplayPinPointList, getAllPlayingPinPoints }: Props) => {
    const { auth: { userToken } } = useAuthContext();
    if (userToken === undefined) return <></>

    const [displayPinPointList, setDisplayPinPointList] = useDisplayPinPointList;
    const [isModalVisible, setModalVisible] = useState(false);
    const [toggleUnClear, setToggleUnClear] = useState(false);
    const [toggle100m, setToggle100m] = useState(false);

    useEffect(() => {
        onFilter(toggleUnClear, toggle100m);
    }, [])

    const onReset = () => {
        const init = async () => {
            await getAllPlayingPinPoints()
            onFilter(toggleUnClear, toggle100m);
        }
        init();
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }
    const onToggleUnClear = () => {
        onFilter(!toggleUnClear, toggle100m);
        setToggleUnClear(!toggleUnClear);
    }
    const onToggle100m = () => {
        onFilter(toggleUnClear, !toggle100m);
        setToggle100m(!toggle100m);
    }

    const onFilter = (isUnclear: boolean, is100m: boolean) => {
        var arr = [...playingCampaignList]
        if (isUnclear)
            arr = [...arr.filter(v => !v.cleared)]

        if (is100m)
            arr = [...arr.filter(cam => (
                cam.pinpoints
                    .map(pid => playingPinPointList.find(p => p.id === pid))
                    .some(pinpoint => {
                        if (pinpoint === undefined) return false

                        const distance = getDistance(
                            { latitude: pinpoint.latitude, longitude: pinpoint.longitude },
                            { latitude: userToken.coords.latitude, longitude: userToken.coords.longitude }
                        )
                        return distance < 100
                    })
            ))]

        // 전체 참여중인 핀포인트 중에서 표시할 캠페인에 속해 있는 핀포인트만 표시
        setDisplayPinPointList(playingPinPointList.filter((p) => (
            arr.some(c => c.pinpoints.some(pid => p.id === pid))
        )))
    }
    const onDisplayToggle = (cam: PlayingCampaign) => {
        if (isDisPlay(cam))
            setDisplayPinPointList(displayPinPointList.filter(p => !cam.pinpoints.some(pid => pid === p.id)))
        else
            setDisplayPinPointList([...displayPinPointList, ...playingPinPointList.filter(p => cam.pinpoints.some(pid => pid === p.id))])
    }

    // util
    const isDisPlay = (cam: PlayingCampaign) => {
        return cam.pinpoints.some(pid => displayPinPointList.some(p => p.id === pid))
    }
    // render
    const renderBorderColor = (cam: PlayingCampaign) => isDisPlay(cam) ? colorCode.primary : colorCode.disable
    const renderBorderWidth = (cam: PlayingCampaign) => isDisPlay(cam) ? 1 : 0.5

    return (
        <Container>
            <TouchableOpacity activeOpacity={0.7} onPress={toggleModal}>
                <Ionicons name="ios-location" size={40} color={colorCode.primary} />
            </TouchableOpacity>

            <Modal
                isVisible={isModalVisible}
                animationIn="zoomIn"
                animationOut="fadeOut"
                backdropOpacity={0.5}
            >
                <View style={styles.modalContainer}>
                    <Title>참여중인 캠페인 목록</Title>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ height: 40 }}>
                        <BadgeButton title="초기화" onPress={onReset} />
                        <BadgeButton title="도전 중인 캠페인만 표시하기" onPress={onToggleUnClear} backgroundToggle={toggleUnClear} />
                        <BadgeButton title="100m 이내의 캠페인만 표시하기" onPress={onToggle100m} backgroundToggle={toggle100m} />
                    </ScrollView>
                    <Text1 style={{ fontSize: 10, marginVertical: 4 }}>* 파란색 테두리가 지도에 표시되는 핀포인트입니다.</Text1>


                    <ScrollView showsVerticalScrollIndicator={false} style={{ height: "100%" }}>
                        {
                            playingCampaignList.length === 0 ?
                                <View style={{ flex: 1, justifyContent: "center", marginTop: "40%" }}>
                                    <Title>텅</Title>
                                </View>
                                :
                                playingCampaignList.map((cam, idx) => (
                                    <ListItem key={idx}
                                        onPress={() => onDisplayToggle(cam)}
                                        style={{ borderRadius: 20, marginVertical: 4 }}
                                        containerStyle={{ borderWidth: renderBorderWidth(cam), borderColor: renderBorderColor(cam), borderRadius: 20 }}
                                    >
                                        <ListItem.Content>
                                            <Row>
                                                <Text style={{ fontWeight: "bold", fontSize: 16 }}>{cam.name}</Text>
                                                {cam.cleared && <TitleBadge title="클리어" backgroundColor={colorCode.primary} />}
                                            </Row>
                                            <Text>{cam.region}</Text>
                                        </ListItem.Content>
                                    </ListItem>
                                ))
                        }
                    </ScrollView>
                </View>

                <TouchableOpacity onPress={toggleModal} style={{ alignSelf: 'center', marginTop: 20 }}>
                    <FontAwesome name="close" color={"#FFF"} size={40} />
                </TouchableOpacity>
            </Modal>
        </Container>
    )
}
export default PlayingCampaignModal;

const styles = StyleSheet.create({
    modalContainer: {
        width: '90%',
        height: '80%',
        marginTop: 80,
        alignSelf: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20
    }
})

