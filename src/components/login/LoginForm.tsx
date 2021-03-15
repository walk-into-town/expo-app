import React, { useState } from 'react'
import styled from 'styled-components/native';

import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/EvilIcons';
import { useAuthContext } from '../../api/Auth';


interface Props {

}

const LoginForm = ({ }: Props) => {
    const [id, setId] = useState("")
    const [pw, setPw] = useState("")

    const onClick = () => {
        console.log(id, pw)
    }
    const { useAuth: { signIn } } = useAuthContext();

    return (
        <Container>
            <Input
                onChangeText={(text: string) => setId(text)}
                textAlign={'center'}
            />

            <Input
                onChangeText={(text: string) => setPw(text)}
                errorMessage='ENTER A VALID ERROR HERE'
                errorStyle={{ color: '#517fa4', textAlign: "center" }}
                secureTextEntry={true}
                textAlign={'center'}
            />

            <Btns>
                <Icon name="sc-telegram" color="#517fa4" size={70} onPress={signIn} />
                <Icon name="sc-github" color="#517fa4" size={70} onPress={onClick} />
            </Btns>

        </Container>
    )
}

export default LoginForm;

const Container = styled.View`
    align-items: center;
`
const Btns = styled.View`
    flex-direction: row;
    
`