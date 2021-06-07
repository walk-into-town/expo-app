import { RegisterMember } from '@types';
import React, { useState } from 'react'
import { View } from 'react-native';
import { API } from '../api';
import { ClearButton, DefaultAlert } from '../atoms';
import RegisterModal from '../components/LoginStack/RegisterModal';
import { useAuthContext, useLoadingContext } from '../useHook';

import { isBlank } from '../util';

const LoginRegister = () => {
    const { useAuth: { signIn } } = useAuthContext();
    const { useLoading: { startLoading, endLoading } } = useLoadingContext()

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
        if (!re.test(id) || !re.test(pw) || isBlank([nickname])) {
            setError("입력을 확인해주세요");
            return;
        }
        const user: RegisterMember = {
            id,
            pw,
            nickname,
            isManager: false
        }
        setError("로딩중...")
        const { result, data, error, errdesc } = await API.memberRegister(user);
        if (result === "failed" || data === undefined)
            setError(errdesc ? errdesc : " ")
        else {
            setError(" ")
            console.log("[회원가입 성공]", data)
            DefaultAlert({
                title: `[${id}]님 환영합니다`,
                subTitle: "회원가입에 성공하셨습니다.",
                btColor: "cancel",
                onPress: () => {
                    toggleModal();
                    setTimeout(() => signIn({ id, pw }), 500);
                }
            })
        }
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
