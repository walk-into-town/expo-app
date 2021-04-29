import React from 'react'
import { useAuthContext } from '../../util/Auth';
import { mainNavigation } from '../../navigation/useNavigation';

import Profile from '../../components/MyPageStack/Profile';
import BadgeList from '../../components/MyPageStack/BadgeList';
import { ClearButton } from '../../atoms';
import { Container, Row } from '../../atoms/styled';

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