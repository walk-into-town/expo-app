import React from 'react'
import { useAuthContext } from '../util/Auth';
import { modalNavigation } from '../navigation/useNavigation';

import Profile from '../components/MyPage/Profile';
import BadgeList from '../components/MyPage/BadgeList';
import { ClearButton } from '../atoms';
import { Container, Row } from '../atoms/styled';

interface Props {
}

export default ({ }: Props) => {

    const { useAuth: { signOut }, auth: { userToken } } = useAuthContext();
    const modalNav = modalNavigation();
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
                <ClearButton title="내 쿠폰함" onPress={() => modalNav.navigate('MyCoupon')} type="clear" />
                <ClearButton title="로그아웃" onPress={onPressLogout} type="clear" />
            </Row>

            <BadgeList />

        </Container>
    )
}