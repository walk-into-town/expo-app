import React from 'react'
import { Text } from 'react-native'
import { Button, Image } from 'react-native-elements/'
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
            <Text>Discription of game Discription of game Discription of game</Text><Text>Discription of game Discription of game Discription of game</Text>
            <Text>Discription of game Discription of game Discription of game</Text>
            <Text> </Text>
            <Button
                title="selector 1"
                onPress={() => console.log("play")} />
            <Button
                title="selector 2"
                onPress={() => console.log("play")} />
            <Button
                title="selector 3"
                onPress={() => console.log("play")} />
            <Button
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