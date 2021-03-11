import React from 'react'
import styled from 'styled-components/native'
import { Button, Text } from 'react-native'
import { useAuthContext } from '../api/Auth';
import { getStorage } from '../api/AsyncStorage';

interface Props {
}

const Home = ({}: Props) => {

    const { useAuth: { signOut } } = useAuthContext();
    let test = {name: "before"};
    getStorage("user").then(res => {
        test = res;
        console.log(res)
    });

    return (
        <Container background="#ececec">
            <Text>Hello World</Text>
            <Text>{test.name}</Text>
            <Button
                title="logout"
                onPress={signOut} />

        </Container>
    )
}

interface IContainerProps {
    background: string;
}
const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${(props: IContainerProps) => props.background ? props.background : 'white'};
`

export default Home;
