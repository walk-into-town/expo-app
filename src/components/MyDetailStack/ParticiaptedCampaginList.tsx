import { PlayingCampaign } from '@types'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { API } from '../../api'
import { BadgeButton, colorCode, DefaultAlert, Row, SelectionAlert, SubTitle, Text1, Text3, TitleBadge } from '../../atoms'
import { mainNavigation } from '../../useHook'
import { getDummySearchCampaign } from '../../util'
import ClearedPinPointModal from './ClearedPinPointModal'

interface Props {
    playingCampaignList: PlayingCampaign[]
}

const ParticiaptedCampaginList = (props: Props) => {
    const nav = mainNavigation();
    const navToCampaignDetail = (id: string) => {
        nav.navigate('ModalNav', { screen: 'CampaignDetailStack', params: { campaign: getDummySearchCampaign(id) } })
    }
    const [playingCampaignList, setPlayingCampaignList] = useState<PlayingCampaign[]>([])
    const [filterToggle, setFilterToggle] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const [selectedCampaign, setSelectedCampaign] = useState<PlayingCampaign>()

    useEffect(() => {
        setPlayingCampaignList(props.playingCampaignList)
    }, [props.playingCampaignList])

    useEffect(() => {
        setPlayingCampaignList(onFilter())
    }, [filterToggle])

    // usecase
    const nextToggle = () => {
        setFilterToggle(filterToggle === 2 ? 0 : filterToggle + 1)
    }

    const getPinpoints = async (caid: string) => {
        const { result, data, error, errdesc } = await API.pinPointRead({ type: "list", value: caid })
        if (result === "failed" || data === undefined)
            DefaultAlert({ title: error, subTitle: errdesc })

        return data;
    }


    const onFilter = () => {
        switch (filterToggle) {
            case 0:
                return props.playingCampaignList
            case 1:
                return props.playingCampaignList.filter(v => v.cleared)
            case 2:
                return props.playingCampaignList.filter(v => !v.cleared)
        }
        return props.playingCampaignList
    }

    const onLongPress = (v: PlayingCampaign) => {
        console.log("[????????? ID] " + v.id)
        setSelectedCampaign(v);
        SelectionAlert({
            title: v.name + " ID",
            subTitle: v.id,
            buttons: [
                { text: "ID ????????????", onPress: () => { } },
                { text: "???????????? ???????????? ??????", onPress: () => setIsVisible(true) },
            ],
        })
    }

    // render
    const renderFilterText = (): string => {
        switch (filterToggle) {
            case 0:
                return "?????? ??????"
            case 1:
                return "???????????? ???????????? ??????"
            case 2:
                return "???????????? ???????????? ??????"
        }
        return "error"
    }

    return (
        <>
            <View style={{ marginVertical: 10, marginLeft: 10 }}>
                <Text1>???????????? ??? ????????? [ ????????? ???????????? ]??? ??? ??? ?????????!</Text1>
                <Row style={{ marginVertical: 4 }}>
                    <BadgeButton title={renderFilterText()} onPress={nextToggle} backgroundToggle={filterToggle === 0} />
                </Row>
                <Text1>????????? ????????? {playingCampaignList.length}</Text1>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    playingCampaignList.map((v, idx) => (
                        <ListItem key={idx} onPress={() => navToCampaignDetail(v.id)} onLongPress={() => onLongPress(v)}>
                            <Avatar source={{ uri: v.imgs[0] || "gray" }} avatarStyle={{ borderRadius: 10 }} size={50} />
                            <ListItem.Content>
                                <Row>
                                    <SubTitle>{v.name}</SubTitle>
                                    <View style={{ marginBottom: 5 }}>
                                        {v.cleared ?
                                            <TitleBadge title="?????????" backgroundColor={colorCode.primary} />
                                            :
                                            <Text3 style={{ marginLeft: 8 }}>{v.clearedPinpoints.length}/{v.pinpoints.length}</Text3>
                                        }
                                    </View>
                                </Row>
                                <Text3>{v.description}</Text3>
                                <Text3>{v.region}</Text3>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    ))
                }
            </ScrollView >
            <ClearedPinPointModal
                useIsVisble={[isVisible, setIsVisible]}
                campaign={selectedCampaign}
                getPinpoints={getPinpoints}
            />
        </>
    )
}

export default ParticiaptedCampaginList
