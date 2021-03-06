import { MemberInfoRes } from '@types';
import React, { useEffect } from 'react'
import { Platform, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SubTitle, Text3, WhiteView } from '../../atoms';
import { useAuthContext, mainNavigation } from '../../useHook';

interface Props {
    memberInfo: MemberInfoRes
}

const Profile = ({ memberInfo }: Props) => {
    const { auth: { userToken } } = useAuthContext();
    const mainNav = mainNavigation();

    const navToMyDetail = (idx: number) => {
        mainNav.navigate("ModalNav", { screen: "MyDetailStack", params: { selectedIndex: idx } })
    }

    // 안드로이드에선 깨짐;;
    const fontSize = Platform.OS === "android" ? 11 : 12;

    return (
        <WhiteView style={{ paddingVertical: 20, marginTop: 10 }}>
            <ListItem>
                <ListItem.Content style={{ marginRight: 8 }}>
                    <Avatar
                        size={'large'}
                        source={{ uri: userToken?.profileImg }}
                        rounded
                    />
                </ListItem.Content>

                <ListItem.Content>
                    <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navToMyDetail(0)}>
                        <SubTitle>{memberInfo.myCampaign}</SubTitle>
                        <Text3 style={{ fontSize }}>제작한 캠페인</Text3>
                    </TouchableOpacity>
                </ListItem.Content>

                <ListItem.Content>
                    <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navToMyDetail(1)}>
                        <SubTitle>{memberInfo.playingCampaign}</SubTitle>
                        <Text3 style={{ fontSize }}>참여중 캠페인</Text3>
                    </TouchableOpacity>
                </ListItem.Content >

                <ListItem.Content>
                    <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navToMyDetail(1)}>
                        <SubTitle>{memberInfo.clearCampaign}</SubTitle>
                        <Text3 style={{ fontSize }}>클리어</Text3>
                    </TouchableOpacity>
                </ListItem.Content>
            </ListItem>

            <View style={{ marginLeft: 20 }}>
                <SubTitle>{userToken?.nickname}</SubTitle>
                <Text3>{userToken?.selfIntroduction}</Text3>
            </View>
        </WhiteView>
    )
}

export default Profile;