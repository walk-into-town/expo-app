import React from 'react'
import styled from 'styled-components/native'
import { Button, Text } from 'react-native'
import { useAuth } from '../api/Auth';

interface Props {

}


const Home = ({}: Props) => {

    const { signOut } = useAuth();


    return (
        <Container background="#ececec">
            <Text>Hello World</Text>

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
