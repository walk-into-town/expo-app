import React, { useState } from 'react'

import Login from '../components/LoginStack/Login';
import { useAuthContext } from '../useHook';
import { isBlank } from '../util';

const LoginStack = () => {
    const { useAuth: { signIn } } = useAuthContext();
    const [id, setId] = useState("")
    const [pw, setPw] = useState("")
    const [error, setError] = useState(" ");

    const onClick = () => {
        console.log(id, pw)
    }

    const onPressLogin = async () => {
        if (isBlank([id, pw])) {
            setError("빈칸을 입력해주세요")
            return;
        }
        const error = await signIn({ id, pw });
        setError(error)
    }

    return (
        <Login
            useId={[id, setId]}
            usePw={[pw, setPw]}
            error={error}
            onClick={onClick}
            onPressLogin={onPressLogin}
        />
    )
}

export default LoginStack;