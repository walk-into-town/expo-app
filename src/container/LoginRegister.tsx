import { RegisterMember } from '@types';
import React, { useState } from 'react'
import { View } from 'react-native';
import { API } from '../api';
import { ClearButton } from '../atoms';
import RegisterModal from '../components/Login/RegisterModal';
import { $$, useAuthContext, useLoadingContext } from '../util';

const LoginRegister = () => {
    const { useLoading: { startLoading, endLoading } } = useLoadingContext();
    const { useAuth: { signIn } } = useAuthContext();

    const [isModalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [nickname, setNickname] = useState("");
    const [error, setError] = useState("")

    const toggleModal = () => setModalVisible(!isModalVisible);
    const openModal = () => {
        setId("");
        setPw("");
        setNickname("");
        setError(" ")
        toggleModal();
    }

    const onSubmit = async () => {
        const re = /^[a-zA-Z0-9]{4,12}$/
        if (!re.test(id) || !re.test(pw) || $$.isBlank([nickname])) {
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
            <RegisterModal
                isModalVisible={isModalVisible}
                useId={[id, setId]}
                useError={[error, setError]}
                useNickname={[nickname, setNickname]}
                usePw={[pw, setPw]}
                
                onSubmit={onSubmit}
                toggleModal={toggleModal}
            />
        </View>
    )
}

export default LoginRegister;
