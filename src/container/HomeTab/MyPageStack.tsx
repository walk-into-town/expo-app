import React, { useEffect, useState } from 'react'
import { mainNavigation, useAuthContext } from '../../useHook';

import { Container, DefaultAlert } from '../../atoms';
import { ScrollView } from 'react-native';
import Profile from '../../components/MyPageStack/Profile';
import BadgeList from '../../components/MyPageStack/BadgeList';
import Settings from '../../components/MyPageStack/Settings';
import Playground from '../../components/MyPageStack/Playground';
import { API } from '../../api';
import { MemberInfoRes } from '@types';

export default () => {

    const { useAuth: { signOut }, auth: { userToken } } = useAuthContext();
    const [memberInfo, setMemberInfo] = useState<MemberInfoRes>({ clearCampaign: 0, myCampaign: 0, playingCampaign: 0 })

    // profile
    useEffect(() => {
        const getMemberInfo = async () => {
            if (userToken === undefined)
                return;

            const { result, data, error, errdesc } = await API.memberInfoRead({ id: userToken.id })
            if (result === "failed" || data === undefined) {
                DefaultAlert({ title: error, subTitle: errdesc })
                return;
            }
            setMemberInfo(data);
        }
        getMemberInfo();
    }, [])

    // playground
    const mainNav = mainNavigation();
    const navToCoupon = () => {
        mainNav.navigate("ModalNav", { screen: "MyCouponStack" })
    }
    const navToProfileEdit = () => {
        mainNav.navigate("EditModalNav", { screen: "MyProfileEditStack" })
    }
    const onLogout = () => {
        if (userToken)
            signOut({ id: userToken.id });
        else
            DefaultAlert({ title: "userToken 에러" });
    }

    // settings
    const onWithdrawal = async () => {
        if (userToken === undefined) {
            DefaultAlert({ title: "유저 토큰 오류" })
            return;
        }
        const { result, data, error, errdesc } = await API.memberWithdraw({ id: userToken.id })
        if (result === "failed" || data === undefined) {
            DefaultAlert({ title: error, subTitle: errdesc })
            return;
        }
        // onLogout();
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