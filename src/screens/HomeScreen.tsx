import React from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'

const HomeScreen = () => {
    return (
        <Container background="#ecece">
            <Text>Hello World</Text>
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

export default HomeScreen;
