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
        };

        bootAsync();
    }, []);

    const useAuth: UseAuth = useMemo(() => ({
        signIn: async ({ id, pw }) => {
            startLoading();

            const { result, error, message } = await API.memberLogin({ id, pw });

            if (result === "failed" || !message) {
                await rmStorage("userToken");
                dispatch({ type: 'RESTORE_TOKEN' })

                endLoading();
                return error ? error : "server error";
            }
            const { nickname, profileImg, seflIntruduction } = message;
            await setStorage("userToken", { id, pw });
            dispatch({ type: 'SIGN_IN', userToken: { id, nickname, profileImg, seflIntruduction } });

            endLoading();
            return "";
        },
        signOut: async () => {
            if (!auth.userToken)
                return;
            startLoading();

            const { result, error } = await API.memberLogout({ id: auth.userToken.id });
            if (result === 'failed') {
                console.log("[로그아웃 에러]", error)
                endLoading();
                return;
            }
            
            await rmStorage("userToken");
            dispatch({ type: 'SIGN_OUT' });
            console.log("[로그아웃]");

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
