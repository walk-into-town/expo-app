import React from 'react'
import styled from 'styled-components/native'
import { useAuthContext } from '../../util/Auth';
import { Container, Row } from '../../atoms/styled';
import Profile from './Profile';
import BadgeList from './BadgeList';
import { Button } from 'react-native-elements';
import { mainNavigation, myPageNavigation } from '../../navigation/useNavigation';
import { ClearButton } from '../../atoms';

interface Props {
}

export default ({ }: Props) => {

    const { useAuth: { signOut } } = useAuthContext();
    const navigation = myPageNavigation();
    const onPressLogout = () => {
        console.log("로그아웃 시도")
        signOut();
    }

    return (
        <Container style={{ alignItems: "center" }}>
            <Profile />

            <Row>
                <ClearButton title="프로필 편집" onPress={() => { }} type="clear" />
                <ClearButton title="로그아웃" onPress={onPressLogout} type="clear" />
                <ClearButton title="내 쿠폰함" onPress={() => navigation.navigate('MyCoupon')} type="clear" />
            </Row>

            <BadgeList />

        </Container>
    )
}