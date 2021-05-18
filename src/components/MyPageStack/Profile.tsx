import { MemberInfoRes } from '@types';
import React from 'react'
import { View } from 'react-native';
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

    return (
        <WhiteView style={{ paddingVertical: 20, marginTop: 10 }}>
            <ListItem>
                <ListItem.Content>
                    <Avatar
                        size={'large'}
                        title={userToken?.nickname}
                        source={{
                            uri: "https://i.imgur.com/fINuUV1.jpg"
                        }}
                    />
                </ListItem.Content>

                <ListItem.Content>
                    <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navToMyDetail(0)}>
                        <SubTitle>{memberInfo.myCampaign}</SubTitle>
                        <Text3>제작한 캠페인</Text3>
                    </TouchableOpacity>
                </ListItem.Content>

                <ListItem.Content>
                    <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navToMyDetail(1)}>
                        <SubTitle>{memberInfo.playingCampaign}</SubTitle>
                        <Text3>참여중 캠페인</Text3>
                    </TouchableOpacity>
                </ListItem.Content >

                <ListItem.Content>
                    <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navToMyDetail(2)}>
                        <SubTitle>{memberInfo.clearCampaign}</SubTitle>
                        <Text3>클리어</Text3>
                    </TouchableOpacity>
                </ListItem.Content>
            </ListItem>

            <View style={{ marginLeft: 20 }}>
                <SubTitle>{userToken?.nickname}</SubTitle>
                <Text3>자기소개</Text3>
            </View>
        </WhiteView>
    )
}

export default Profile;