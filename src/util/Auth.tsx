import { IAuthContext, AuthReduce, UseAuth } from "@types";
import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { API } from "../api";
import { getStorage, setStorage, rmStorage } from "./AsyncStorage";
import { useLoadingContext } from "./Loading";

const AuthContext = createContext<IAuthContext | null>(null);

const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error('Cannot find AuthContext');

    return context;
}

const AuthContextProvider = ({ children }: { children: JSX.Element }) => {

    const { useLoading: { startLoading, endLoading } } = useLoadingContext();

    const reduce: AuthReduce = (_, action) => {
        switch (action.type) {
            case 'SIGN_IN':
                return {
                    userToken: action.userToken,
                };
            case 'SIGN_OUT':
            case 'RESTORE_TOKEN':
                return {
                    userToken: undefined,
                };
        }
    }
    const [auth, dispatch] = useReducer(reduce, {
        userToken: undefined,
    });

    useEffect(() => {
        const bootAsync = async () => {
            const loginData = await getStorage("userToken")
            console.log("AsyncStorage Login Data", loginData)

            if (loginData === null)
                dispatch({ type: 'RESTORE_TOKEN' })
            else
                useAuth.signIn(loginData);
            endLoading();
        };

        bootAsync();
    }, []);

    const useAuth: UseAuth = useMemo(() => ({
        signIn: async ({ id, pw }) => {
            startLoading();

            console.log("[로그인 시도]", id, pw)
            const { result, error, message, session } = await API.memberLogin({ id, pw });
            dispatch({ type: "RESTORE_TOKEN" });

            if (result === "failed" || !message) {
                await rmStorage("userToken");
            }
            else {
                const { nickname, profileImg, seflIntruduction } = message;
                await setStorage("userToken", { id, pw });
                dispatch({ type: 'SIGN_IN', userToken: { id, nickname, profileImg, seflIntruduction } });
                console.log("[로그인 성공]", session)
            }
            endLoading();
            return error ? error : "";
        },
        signOut: async ({ id }) => {
            startLoading();

            const { result, error, session } = await API.memberLogout({ id });
            if (result === 'failed') {
                console.log("[로그아웃 에러]", error)
                endLoading();
                return;
            }

            await rmStorage("userToken");
            dispatch({ type: 'SIGN_OUT' });
            console.log("[로그아웃]", session);

            endLoading();
        }
    }), []);

    return (
        <AuthContext.Provider value={{ auth, useAuth }}>
            {children}
        </AuthContext.Provider>
    )
}


export { AuthContext, useAuthContext, AuthContextProvider }
