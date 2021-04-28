import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Input, Text } from 'react-native-elements'
import { ClearButton } from '../../atoms'
import Modal from 'react-native-modal';
import { BtsWrapper, WhiteText, WhiteTitle } from '../../atoms/styled';
import { WhiteInput } from '../../atoms/elements';
import { RegisterMember } from '@types';
import { API } from '../../api';
import { useAuthContext } from '../../util/Auth';
import { isBlank } from '../../util';
import { useLoadingContext } from '../../util/Loading';

interface Props {

}

const Register = (props: Props) => {
    const { useLoading: { startLoading, endLoading } } = useLoadingContext();

    const [isModalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [nickname, setNickname] = useState("");
    const [error, setError] = useState("")

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const openModal = () => {
        setId("");
        setPw("");
        setNickname("");
        setError(" ")
        toggleModal();
    }

    const { useAuth: { signIn } } = useAuthContext();

    const onSubmit = async () => {
        const re = /^[a-zA-Z0-9]{4,12}$/
        if (!re.test(id) || !re.test(pw) || isBlank([nickname])) {
            setError("입력을 확인해주세요");
            return;
        }
        startLoading();
        const user: RegisterMember = {
            id,
            pw,
            nickname,
            isManager: false
        }
        const { result, message, error } = await API.memberRegister(user);
        if (result === 'success') {
            console.log("[회원가입 성공]", message)
            signIn({ id, pw });
            toggleModal();
        }
        else
            console.log("[회원가입 에러]", error)
        endLoading();
    }
    return (
        <View>
            <ClearButton title="회원가입" onPress={openModal} />
            <Modal isVisible={isModalVisible} avoidKeyboard animationIn={'pulse'} animationOut={'fadeOut'}>
                <WhiteTitle style={{ marginBottom: 5 }}>회원가입</WhiteTitle>
                <WhiteText style={{ marginBottom: 15 }}>아이디 비밀번호는 4-12자 영문과 숫자만 입력</WhiteText>

                <WhiteInput
                    value={id}
                    onChangeText={(text: string) => setId(text)}
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

                <WhiteText style={{ marginBottom: 15 }}>{error}</WhiteText>
                <BtsWrapper>
                    <TouchableOpacity onPress={toggleModal} style={{ marginRight: 20 }}>
                        <WhiteTitle style={{ fontSize: 27 }}>닫기</WhiteTitle>
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
