import { IAuth, IAuthContext, IReduce, IUseAuth, IUserToken, RegisterMember } from "@types";
import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { API } from "../api";
import { getStorage, setStorage, rmStorage } from "./AsyncStorage";

const AuthContext = createContext<IAuthContext | null>(null);

const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error('Cannot find AuthContext');

    return context;
}

const AuthContextProvider = ({ children }: { children: JSX.Element }) => {

    const reduce:IReduce = (_, action) => {
        switch (action.type) {
            case 'SIGN_IN':
                return {
                    isLoading: false,
                    userToken: action.userToken,
                };
            case 'SIGN_OUT':
            case 'RESTORE_TOKEN':
                return {
                    isLoading: false,
                    userToken: undefined,
                };
            case 'LOADING':
                return {
                    isLoading: true,
                    userToken: undefined,
                }
        }
    }
    const [auth, dispatch] = useReducer(reduce, {
        isLoading: true,
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

    const useAuth: IUseAuth = useMemo(() => ({
        signIn: async ({ id, pw }) => {
            dispatch({ type: "LOADING" })

            const {result, error, message} = await API.memberLogin({ id, pw });

            if (result === "failed" || !message) {
                console.log(`[${id} 로그인]`, error)
                await rmStorage("userToken");
                dispatch({ type: 'RESTORE_TOKEN'})
                return error ? error : "";
            }
            const { nickname, profileImg, seflIntruduction } = message;
            await setStorage("userToken", { id, pw });
            dispatch({ type: 'SIGN_IN', userToken: { id, nickname, profileImg, seflIntruduction } });
            return "";
        },
        signOut: async () => {
            if(!auth.userToken)
                return;

            dispatch({ type: "LOADING" })
            const { result, error} = await API.memberLogout({id: auth.userToken.id});
            if (result === 'failed') {
                console.log("[로그아웃 에러]", error)
                return;
            }

            console.log("[로그아웃]")
            await rmStorage("userToken");
            dispatch({ type: 'SIGN_OUT' })
        }
    }), []);

    return (
        <AuthContext.Provider value={{ auth, useAuth }}>
            {children}
        </AuthContext.Provider>
    )
}


export { AuthContext, useAuthContext, AuthContextProvider }
