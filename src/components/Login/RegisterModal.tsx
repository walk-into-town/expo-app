import React, { useState } from 'react'
import { TuseState } from '@types';
import { TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal';
import { WhiteInput } from '../../atoms'
import { BtsWrapper, WhiteText, WhiteTitle } from '../../atoms/styled';


interface Props {
    isModalVisible: boolean,
    useId: TuseState<string>,
    usePw: TuseState<string>,
    useNickname: TuseState<string>,
    useError: TuseState<string>,
    toggleModal: () => void,
    onSubmit: () => Promise<void>
}

const RegisterModal = (props: Props) => {
    const [id, setId] = props.useId;
    const [pw, setPw] = props.usePw;
    const [nickname, setNickname] = props.useNickname;
    const [error, setError] = props.useError;

    return (
        <Modal isVisible={props.isModalVisible} avoidKeyboard animationIn={'pulse'} animationOut={'fadeOut'}>
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
                <TouchableOpacity onPress={props.toggleModal} style={{ marginRight: 20 }}>
                    <WhiteTitle style={{ fontSize: 27 }}>닫기</WhiteTitle>
                </TouchableOpacity>

                <TouchableOpacity onPress={props.onSubmit}>
                    <WhiteTitle style={{ fontSize: 27 }}>완료</WhiteTitle>
                </TouchableOpacity>
            </BtsWrapper>
        </Modal>
    )
}

export default RegisterModal;
