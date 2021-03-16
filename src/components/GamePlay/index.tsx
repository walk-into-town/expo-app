import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Button, Text } from 'react-native'
import styled from 'styled-components/native'

interface Props {

}

export default (props: Props) => {
    const navigation = useNavigation();
    return (
        <Container>
            <Text>Map</Text>
            <Button
                title="play"
                onPress={() => navigation.navigate("Game")} />
        </Container>
    )
}


const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`
