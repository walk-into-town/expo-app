import React from 'react'
import { TuseState } from '@types';
import { View, Image } from 'react-native';
import { Input } from 'react-native-elements'
import styled from 'styled-components/native';
import { BtsWrapper, Container } from '../../atoms/styled';
import { ClearButton, EvilIcons } from '../../atoms';
import LoginRegister from '../../container/LoginRegister';


interface Props {
    useId: TuseState<string>,
    usePw: TuseState<string>,
    useError: TuseState<string>,
    onClick: () => void,
    onPressLogin: () => Promise<void>
}

const Login = (props: Props) => {
    const tmpColor = "#517fa4";

    const [id, setId] = props.useId;
    const [pw, setPw] = props.usePw;
    const [error, setError] = props.useError;

    return (
        <Container style={{ backgroundColor: "#FFF" }}>
            <BackGround>
                <Image source={{ uri: "https://media4.giphy.com/media/52FJUMAZnBro3QyZWO/source.gif" }}
                    style={{ width: 300, height: 300, opacity: 0.2 }} />
            </BackGround>
            <View style={{ marginTop: '30%' }}>
                <Input
                    onChangeText={(text: string) => setId(text)}
                    inputStyle={{ textAlign: "center", fontSize: 25, fontFamily: "SCDream8" }}
                    autoCapitalize="none"
                />

                <Input
                    onChangeText={(text: string) => setPw(text)}
                    errorMessage={error}
                    errorStyle={{ color: tmpColor, textAlign: "center", fontSize: 15 }}
                    secureTextEntry={true}
                    inputStyle={{ textAlign: "center", fontSize: 30 }}
                />

                <BtsWrapper style={{ marginVertical: 7 }}>
                    <LoginRegister />
                    <ClearButton title="로그인" onPress={props.onPressLogin} />
                </BtsWrapper>

                <BtsWrapper>
                    <EvilIcons name="sc-telegram" color={tmpColor} size={50} onPress={props.onClick} />
                    <EvilIcons name="sc-github" color={tmpColor} size={50} onPress={props.onClick} />
                    <EvilIcons name="sc-facebook" color={tmpColor} size={50} onPress={props.onClick} />
                    <EvilIcons name="sc-google-plus" color={tmpColor} size={50} onPress={props.onClick} />
                </BtsWrapper>
            </View>
        </Container>
    )
}

const BackGround = styled.View`
    position: absolute;
    top: 20%;
    left: 20%;
`

export default Login;