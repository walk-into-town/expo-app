import React from 'react'
import styled from 'styled-components/native'
import { Button, Text } from 'react-native'
import { useAuthContext } from '../../api/Auth';
import { Container } from '../../atoms/styled';
import Profile from './Profile';
import BadgeList from './BadgeList';

interface Props {
}

export default({ }: Props) => {

    const { useAuth: { signOut } } = useAuthContext();

    return (
        <Container>
            <Text>My page</Text>
            <Profile />
            <BadgeList />

            <Button
                title="logout"
                onPress={signOut} />

        </Container>
    )
}