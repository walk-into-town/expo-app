import React, { useState } from 'react'

import { useAuthContext } from '../../util/Auth';
import { Button, Input, Text } from 'react-native-elements'
import { View } from 'react-native';
import { BtsWrapper } from '../../atoms/styled';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { ClearButton } from '../../atoms';
import Register from './Register';
import { isBlank } from '../../util';


interface Props {

}

const LoginForm = ({ }: Props) => {
    const [id, setId] = useState("")
    const [pw, setPw] = useState("")
    const [error, setError] = useState(" ");

    const tmpColor = "#517fa4";

    const onClick = () => {
        console.log(id, pw)
    }
    const { useAuth: { signIn } } = useAuthContext();

    const onPressLogin = async () => {
        if (isBlank([id, pw])) {
            setError("빈칸을 입력해주세요")
            return;
        }
        const error = await signIn({ id, pw });
        setError(error)
    }

    return (
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
                <Register />
                <ClearButton title="로그인" onPress={onPressLogin} />
            </BtsWrapper>

            <BtsWrapper>
                <EvilIcons name="sc-telegram" color={tmpColor} size={50} onPress={onClick} />
                <EvilIcons name="sc-github" color={tmpColor} size={50} onPress={onClick} />
                <EvilIcons name="sc-facebook" color={tmpColor} size={50} onPress={onClick} />
                <EvilIcons name="sc-google-plus" color={tmpColor} size={50} onPress={onClick} />
            </BtsWrapper>
        </View>
    )
}

export default LoginForm;