import React from 'react'
import styled from 'styled-components/native'
import { Button, Text, View } from 'react-native'
import { useAuthContext } from '../../api/Auth';

interface Props {
}

export default({ }: Props) => {

    const { auth: { userToken }, useAuth: { signOut } } = useAuthContext();
    

    return (
        <Container background="#ececec">
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

interface IContainerProps {
    background?: string;
}
const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${(props: IContainerProps) => props.background ? props.background : 'white'};
`
const Wrapper = styled.View`

    justify-content: center;
    align-items: center;
    margin: 10px;
`
