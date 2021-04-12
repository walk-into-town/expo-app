import React from 'react'
import styled from 'styled-components/native'
import { useAuthContext } from '../../api/Auth';
import { Container, Row } from '../../atoms/styled';
import Profile from './Profile';
import BadgeList from './BadgeList';
import { Button } from 'react-native-elements';
import { mainNavigation, myPageNavigation } from '../../navigation/useNavigation';

interface Props {
}

export default ({ }: Props) => {

    const { useAuth: { signOut } } = useAuthContext();
    const navigation = myPageNavigation();

    return (
        <Container style={{ alignItems: "center" }}>
            <Profile />

            <Row>
                <Button title="프로필 편집" onPress={() => { }} type="clear" />
                <Button title="로그아웃" onPress={signOut} type="clear" />
                <Button title="내 쿠폰함" onPress={() => navigation.navigate('MyCoupon')} type="clear" />
            </Row>

            <BadgeList />

        </Container>
    )
}