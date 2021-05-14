import React from 'react'
import { useAuthContext } from '../../useHook';

import Profile from '../../components/MyPageStack/Profile';
import BadgeList from '../../components/MyPageStack/BadgeList';
import { Container, DefaultAlert } from '../../atoms';
import { ScrollView } from 'react-native';
import Settings from '../../components/MyPageStack/Settings';
import Playground from '../../components/MyPageStack/Playground';
import { mainNavigation } from '../../navigation/useNavigation';
import { API } from '../../api';

export default () => {

    const { useAuth: { signOut }, auth: { userToken } } = useAuthContext();
    const mainNav = mainNavigation();

    const navToCoupon = () => {
        mainNav.navigate("ModalNav", { screen: "MyCouponStack" })
    }

    const onLogout = () => {
        if (userToken)
            signOut({ id: userToken.id });
        else
            DefaultAlert({ title: "userToken 에러" });
    }

    const onWithdrawal = async () => {
        if (userToken === undefined) {
            DefaultAlert({ title: "유저 토큰 오류" })
            return;
        }
        const { result, data, error, errdesc } = await API.memberWithdraw({ id: userToken.id })
        if(result === "failed" || data === undefined){
            DefaultAlert({ title: error, subTitle: errdesc })
            return;
        }
        // onLogout();
    }

    return (
        <Container>
            <ScrollView>
                <Profile />
                <BadgeList />
                <Playground
                    navToCoupon={navToCoupon}
                    onLogout={onLogout}
                />
                <Settings />
            </ScrollView>
        </Container>
    )
}