import React from 'react'
import styled from 'styled-components/native'
import { Button, Text } from 'react-native'
import { useAuthContext } from '../../api/Auth';
import { Container } from '../../atoms/styledAtoms';

interface Props {
}

export default({ }: Props) => {

    const { auth: { userToken }, useAuth: { signOut } } = useAuthContext();

    if(!userToken)
        return <Text>asdf</Text>;

    return (
        <Container>
            <Text>My page</Text>
            <Text>user name: {userToken.name}</Text>

            <Wrapper>
                <Text>🚩</Text>
                <Text>Joined Campaign list</Text>
            </Wrapper>

            <Wrapper>
                <Text>✈️</Text>
                <Text>Totoal cleared Pin-point</Text>
                <Wrapper>
                    <Text>Badge list</Text>
                </Wrapper>
            </Wrapper>
            <Button
                title="logout"
                onPress={signOut} />

        </Container>
    )
}
const Wrapper = styled.View`

    justify-content: center;
    align-items: center;
    margin: 10px;
`
