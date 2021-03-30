import React from 'react'
import styled from 'styled-components/native'
import { Button, Text } from 'react-native'
import { useAuthContext } from '../../api/Auth';
import { Container, Row } from '../../atoms/styled';
import Profile from './Profile';
import BadgeList from './BadgeList';

interface Props {
}

export default({ }: Props) => {

    const { useAuth: { signOut } } = useAuthContext();

    return (
        <Container>
            <Profile />

            <Row>
                <Button title="프로필 편집" onPress={() => { }} />
                <Button title="로그아웃" onPress={signOut} />
            </Row>

            <BadgeList />

        </Container>
    )
}