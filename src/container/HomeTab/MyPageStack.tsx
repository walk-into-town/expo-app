import React, { useEffect, useState } from 'react'
import { mainNavigation, useAuthContext } from '../../useHook';

import { Container, DefaultAlert } from '../../atoms';
import { RefreshControl, ScrollView } from 'react-native';
import Profile from '../../components/MyPageStack/Profile';
import BadgeList from '../../components/MyPageStack/BadgeList';
import Settings from '../../components/MyPageStack/Settings';
import Playground from '../../components/MyPageStack/Playground';
import { API } from '../../api';
import { MemberInfoRes } from '@types';
import { useIsFocused } from '@react-navigation/core';
import { Text } from 'react-native-elements';

export default () => {

    const { useAuth: { signOut }, auth: { userToken } } = useAuthContext();
    if (userToken === undefined) return <></>

    const isFocuse = useIsFocused()
    const [memberInfo, setMemberInfo] = useState<MemberInfoRes>({ clearCampaign: 0, myCampaign: 0, playingCampaign: 0 })

    // api
    const getMemberInfo = async () => {

        const { result, data, error, errdesc } = await API.memberInfoRead({ id: userToken.id })
        if (result === "failed" || data === undefined) {
            DefaultAlert({ title: error, subTitle: errdesc })
            return;
        }
        setMemberInfo(data);
    }

    const onWithdrawal = async () => {
        const { result, data, error, errdesc } = await API.memberWithdraw({ id: userToken.id })
        if (result === "failed" || data === undefined) {
            DefaultAlert({ title: error, subTitle: errdesc })
            return;
        }
        // onLogout();
    }

    useEffect(() => {
        if (isFocuse)
            getMemberInfo();
    }, [isFocuse])

    // playground
    const mainNav = mainNavigation();
    const navToCoupon = () => {
        mainNav.navigate("ModalNav", { screen: "MyCouponStack" })
    }
    const navToProfileEdit = () => {
        mainNav.navigate("EditModalNav", { screen: "MyProfileEditStack" })
    }
    const onLogout = () => {
        signOut({ id: userToken.id });
    }

    return (
        <Container>
            <ScrollView>
                <Profile memberInfo={memberInfo} />
                <BadgeList />
                <Playground
                    onLogout={onLogout}
                    navToCoupon={navToCoupon}
                    navToProfileEdit={navToProfileEdit}
                />
                <Settings />
            </ScrollView>
        </Container>
    )
}