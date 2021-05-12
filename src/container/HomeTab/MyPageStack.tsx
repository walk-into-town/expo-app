import React from 'react'
import { useAuthContext } from '../../useHook';

import Profile from '../../components/MyPageStack/Profile';
import BadgeList from '../../components/MyPageStack/BadgeList';
import { Container, DefaultAlert } from '../../atoms';
import { ScrollView } from 'react-native';
import Settings from '../../components/MyPageStack/Settings';
import Playground from '../../components/MyPageStack/Playground';
import { mainNavigation } from '../../navigation/useNavigation';

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

    const onWithdrawal = () => {
        
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