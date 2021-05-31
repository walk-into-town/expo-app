import { MyCampaign, PartedMember, TuseState } from '@types'
import React, { useState } from 'react'
import Clipboard from 'expo-clipboard';
import { View } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { BadgeButton, SelectionAlert, SubTitle, Text1, Text3 } from '../../atoms'
import { mainNavigation } from '../../useHook'
import ParticiaptedUserModal from './ParticiaptedUserModal';

interface Props {
    myCampaignList: MyCampaign[]
    usePartedUserList: TuseState<PartedMember[]>
    getPartedUsers: (caid: string) => void
}

const MakedCampaignList = (props: Props) => {
    const mainNav = mainNavigation();
    const navToCampaignDetail = (campaign: MyCampaign) => {
        mainNav.navigate("ModalNav", {
            screen: "CampaignDetailStack", params: {
                campaign: {
                    id: campaign.id,
                    name: campaign.name,
                    description: campaign.description,
                    imgs: campaign.imgs,
                    ownner: "",
                    region: "",
                    updateTime: "",
                    comments: [],
                    coupons: [],
                    pcoupons: [],
                    pinpoints: []
                }
            }
        })
    }

    const onLongPress = (v: MyCampaign) => {
        console.log("[캠페인 ID] " + v.id)
        SelectionAlert({
            title: v.name + " ID",
            subTitle: v.id,
            buttons: [
                { text: "ID 복사하기", onPress: () => Clipboard.setString(v.id) },
                { text: "참여중인 유저 정보 보기", onPress: () => onParticipatedUser(v.id) },
            ],
        })
    }

    const [isVisible, setIsVisible] = useState(false)
    const onParticipatedUser = (caid: string) => {
        props.getPartedUsers(caid);
        setIsVisible(true);
    }

    return (
        <>
            <View style={{ marginTop: 10, marginBottom: 20, marginLeft: 10 }}>
                <Text1>리스트를 꾹 누르면 [ 참여중인 유저 정보 ]를 볼 수 있어요!</Text1>
            </View>
            <ScrollView>
                {
                    props.myCampaignList.map((v, idx) => (
                        <View key={idx}>
                            <ListItem bottomDivider
                                onPress={() => navToCampaignDetail(v)}
                                onLongPress={() => onLongPress(v)}
                            >
                                {v.imgs !== undefined && v.imgs.length > 0 && <Avatar source={{ uri: v.imgs[0] }} avatarStyle={{ borderRadius: 10 }} />}
                                <ListItem.Content>
                                    <SubTitle>{v.name}</SubTitle>
                                    <Text3>{v.description}</Text3>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        </View>
                    ))
                }
            </ScrollView>
            <ParticiaptedUserModal
                useIsVisble={[isVisible, setIsVisible]}
                usePartedUserList={props.usePartedUserList}
            />
        </>
    )
}

export default MakedCampaignList
