import React from 'react'
import { View } from 'react-native'
import { Image } from 'react-native-elements'
import styled from 'styled-components/native'
import { Container } from '../../atoms/styled'
import LoginForm from './LoginForm'
import Register from './Register'


export default () => {

    return (
        <Container style={{backgroundColor: "#FFF"}}>
            <BackGround>
                <Image source={{ uri: "https://media4.giphy.com/media/52FJUMAZnBro3QyZWO/source.gif" }}
                    style={{ width: 300, height: 300, opacity: 0.2 }} />
            </BackGround>
            <LoginForm />
        </Container>
    )
}

const BackGround = styled.View`
    position: absolute;
    top: 20%;
    left: 20%;
`