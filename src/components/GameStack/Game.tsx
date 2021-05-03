import React from 'react'
import { Image, Text } from 'react-native'
import { Button } from 'react-native-elements/'
import styled from 'styled-components/native'

interface Props {
    
}

const Game = (props: Props) => {
    return (
        <Container>
            <Image
                source={{ uri: "https://static.wikia.nocookie.net/pokemon/images/c/c8/%EC%8B%A0%EB%87%BD_%EA%B3%B5%EC%8B%9D_%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png/revision/latest/scale-to-width-down/340?cb=20170405090113&path-prefix=ko" }}
                style={{ width: 200, height: 200 }} />
            <Text> </Text>
            <Text> </Text>
            <Text> </Text>
            <Text> </Text>
            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam efficitur vestibulum bibendum. Sed vel lectus nisl. Vestibulum a finibus arcu, quis feugiat nunc. Nunc sit amet viverra nulla. Morbi sed convallis erat, nec semper ipsum. Vestibulum lobortis nulla enim, aliquam elementum enim pharetra ut. Quisque vestibulum magna in facilisis tincidunt.</Text>
            <Text> </Text>
            <Button
                type="clear"
                title="selector 1"
                onPress={() => console.log("play")} />
            <Button
                type="clear"
                title="selector 2"
                onPress={() => console.log("play")} />
            <Button
                type="clear"
                title="selector 3"
                onPress={() => console.log("play")} />
            <Button
                type="clear"
                title="selector 4"
                onPress={() => console.log("play")} />
        </Container>
    )
}

export default Game


const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`
