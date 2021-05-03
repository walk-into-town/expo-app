import React from 'react'
import { mainNavigation } from '../../navigation/useNavigation';
import { useAuthContext } from '../../useHook';

import Profile from '../../components/MyPageStack/Profile';
import BadgeList from '../../components/MyPageStack/BadgeList';
import { ClearButton, Container, Row } from '../../atoms';

interface Props {
}

export default ({ }: Props) => {

    const { useAuth: { signOut }, auth: { userToken } } = useAuthContext();
    const mainNav = mainNavigation();

    const onPressLogout = () => {
        if (userToken)
            signOut({ id: userToken.id });
        else
            console.error("userToken 에러")
    }

    return (
        <Container style={{ alignItems: "center" }}>
            <Profile />

            <Row>
                <ClearButton title="프로필 편집" onPress={() => { console.log(userToken) }} type="clear" />
                <ClearButton title="내 쿠폰함" onPress={() => mainNav.navigate("ModalNav", { screen: "MyCouponStack" })} type="clear" />
                <ClearButton title="로그아웃" onPress={onPressLogout} type="clear" />
            </Row>

            <BadgeList />

        </Container>
    )
}