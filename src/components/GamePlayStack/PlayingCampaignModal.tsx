import { Campaign, Coord, PinPoint, PlayingCampaign, SearchCampaign, TuseState } from '@types';
import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { BadgeButton, colorCode, Ionicons, Title, TitleBadge, Container, Row, FontAwesome, Text1, Text3 } from '../../atoms';
import { ListItem } from 'react-native-elements';
import { getDistance } from 'geolib';
import { useAuthContext } from '../../useHook';
import { getDummySearchCampaign } from '../../util';


interface Props {
    userCoord: Coord
    playingCampaignList: PlayingCampaign[],
    playingPinPointList: PinPoint[],
    useDisplayPinPointList: TuseState<PinPoint[]>
    getAllPlayingPinPoints: () => Promise<void>
    getAllPlayingCampaigns: () => Promise<void>
    navtoCampaignDetail: (campaign: SearchCampaign) => void
}

const PlayingCampaignModal = ({ userCoord, playingCampaignList, playingPinPointList, useDisplayPinPointList, getAllPlayingPinPoints, getAllPlayingCampaigns, navtoCampaignDetail }: Props) => {
    const { auth: { userToken } } = useAuthContext();
    if (userToken === undefined) return <></>

    const [displayPinPointList, setDisplayPinPointList] = useDisplayPinPointList;
    const [isModalVisible, setModalVisible] = useState(false);
    const [toggleUnClear, setToggleUnClear] = useState(false);
    const [toggle100m, setToggle100m] = useState(false);

    useEffect(() => {
        onFilter(toggleUnClear, toggle100m);
    }, [playingCampaignList, playingPinPointList])

    const onReset = () => {
        const init = async () => {
            setToggleUnClear(false)
            setToggle100m(false)
            await getAllPlayingPinPoints()
            await getAllPlayingCampaigns();
            // onFilter(toggleUnClear, toggle100m);
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

    // 필터를 적용한 정렬
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

                        const distance = getDistance(pinpoint, userCoord)
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
        <Container style={{ position: 'absolute', top: 10, right: 10 }}>
            <TouchableOpacity activeOpacity={0.7} onPress={toggleModal}>
                <Ionicons name="ios-location" size={40} color={colorCode.primary} />
            </TouchableOpacity>

            <Modal
                isVisible={isModalVisible}
                animationIn="zoomIn"
                animationOut="fadeOut"
                backdropOpacity={0.5}
                onBackdropPress={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <Title>참여중인 캠페인 목록</Title>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ height: 50 }}>
                        <BadgeButton title="초기화" onPress={onReset} />
                        <BadgeButton title="도전 중인 캠페인만 표시하기" onPress={onToggleUnClear} backgroundToggle={toggleUnClear} />
                        <BadgeButton title="100m 이내의 캠페인만 표시하기" onPress={onToggle100m} backgroundToggle={toggle100m} />
                    </ScrollView>
                    <Text1 style={{ fontSize: 10, marginVertical: 4, marginBottom: 8 }}>* 파란색 테두리가 지도에 표시되는 핀포인트입니다.</Text1>


                    <ScrollView showsVerticalScrollIndicator={false} style={{ height: "100%" }}>
                        {
                            playingCampaignList.length === 0 ?
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: "40%" }}>
                                    <Title>텅</Title>
                                    <Text3>[추천 캠페인]을 통해서</Text3>
                                    <Text3>가까운 캠페인에 참여해보세요</Text3>
                                </View>
                                :
                                playingCampaignList.map((cam, idx) => (
                                    <ListItem key={idx}
                                        onPress={() => onDisplayToggle(cam)}
                                        onLongPress={() => { navtoCampaignDetail(getDummySearchCampaign(cam.id)); setModalVisible(false) }}
                                        style={{ borderRadius: 20, marginVertical: 4 }}
                                        containerStyle={{ borderWidth: renderBorderWidth(cam), borderColor: renderBorderColor(cam), borderRadius: 20 }}
                                    >
                                        <View style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: 10,
                                            backgroundColor: renderBorderColor(cam)
                                        }} />
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

