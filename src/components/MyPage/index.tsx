import React from 'react'
import { useAuthContext } from '../../util/Auth';
import { Container, Row } from '../../atoms/styled';
import Profile from './Profile';
import BadgeList from './BadgeList';
import { modalNavigation } from '../../navigation/useNavigation';
import { ClearButton } from '../../atoms';

interface Props {
}

export default ({ }: Props) => {

    const { useAuth: { signOut }, auth: { userToken } } = useAuthContext();
    const modalNav = modalNavigation();
    const onPressLogout = () => {
        if(userToken)
            signOut({ id: userToken.id });
        else
            console.error("userToken 에러")
    }

    return (
        <Container style={{ alignItems: "center" }}>
            <Profile />

            <Row>
                <ClearButton title="프로필 편집" onPress={() => {console.log(userToken)}} type="clear" />
                <ClearButton title="내 쿠폰함" onPress={() => modalNav.navigate('MyCoupon')} type="clear" />
                <ClearButton title="로그아웃" onPress={onPressLogout} type="clear" />
            </Row>

            <BadgeList />

        </Container>
    )
}