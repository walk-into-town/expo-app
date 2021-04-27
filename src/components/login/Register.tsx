import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Input, Text } from 'react-native-elements'
import { ClearButton, FontAwesome } from '../../atoms'
import Modal from 'react-native-modal';
import { BtsWrapper, Row, SubTitle, WhiteSubTitle, WhiteTitle } from '../../atoms/styled';
import { WhiteInput } from '../../atoms/elements';
import { RegisterMember } from '@types';
import { API } from '../../api';
import { useAuthContext } from '../../util/Auth';

interface Props {

}

const Register = (props: Props) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [nickname, setNickname] = useState("");

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const openModal = () => {
        setId("");
        setPw("");
        setNickname("");
        toggleModal();
    }

    const { useAuth: { signIn } } = useAuthContext();

    const onSubmit = async() => {
        const user:RegisterMember = {
            id,
            pw,
            nickname,
            isManager: false
        }
        const { result, message, error} = await API.memberRegister(user);
        if (result === 'success') {
            console.log("[회원가입 성공]", message)
            signIn({ id, pw });
            toggleModal();
        }
        else
            console.log("[회원가입 에러]", error)

    }
    return (
        <View>
            <ClearButton title="회원가입" onPress={openModal} />
            <Modal isVisible={isModalVisible} avoidKeyboard animationIn={'pulse'} animationOut={'fadeOut'}>
                <WhiteTitle>회원가입</WhiteTitle>
                <WhiteInput
                    value={id}
                    onChangeText={(text:string) => setId(text)}
                    placeholder="아이디"
                />
                <WhiteInput
                    value={pw}
                    onChangeText={(text: string) => setPw(text)}
                    placeholder="비밀번호"
                    secureTextEntry={true}
                />
                <WhiteInput
                    value={nickname}
                    onChangeText={(text: string) => setNickname(text)}
                    placeholder="닉네임"
                />

                <BtsWrapper style={{marginTop: 10}}>
                    <TouchableOpacity onPress={toggleModal} style={{ marginRight: 20 }}>
                        <WhiteTitle style={{fontSize: 27}}>닫기</WhiteTitle>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onSubmit}>
                        <WhiteTitle style={{ fontSize: 27 }}>완료</WhiteTitle>
                    </TouchableOpacity>
                </BtsWrapper>
            </Modal>
        </View>
    )
}

export default Register;
