import React from 'react'
import { Button, Text } from 'react-native'
import styled from 'styled-components/native'

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@types';


interface Props {
    navigation: StackNavigationProp<RootStackParamList, 'HomeScreen'>;
}


const Home = ({ navigation }: Props) => {

    return (
        <Container background="#ececec">
            <Text>Hello World</Text>

            <Button
                title="Go to Login... again"
                onPress={() => navigation.push("Login")}
            />
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('HomeScreen')} />
            <Button
                title="Go back"
                onPress={() => navigation.goBack()} />
            <Button
                title="Go back to first screen in stack"
                onPress={() => navigation.popToTop()}
            />
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
