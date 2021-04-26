import { IAuth, IAuthContext, IUseAuth, IUserToken } from "@types";
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

    const reduce = (prevState: IAuth, action: { type: string; userToken?: IUserToken; }): IAuth => {
        switch (action.type) {
            case 'RESTORE_TOKEN':
            case 'SIGN_IN':
                return {
                    isLoading: false,
                    userToken: action.userToken,
                };
            case 'SIGN_OUT':
            default:
                return {
                    isLoading: false,
                    userToken: undefined,
                };
        }
    }
    const [auth, dispatch] = useReducer(reduce, {
        isLoading: true,
        userToken: undefined,
    });

    useEffect(() => {
        const bootAsync = async () => {
            const userToken = await getStorage("userToken")
            dispatch({ type: 'RESTORE_TOKEN', userToken });
        };

        bootAsync();
    }, []);

    const useAuth: IUseAuth = useMemo(() => ({
        signIn: async ({id, pw}) => {
            auth.isLoading = true;

            const res = await API.memberLogin({id, pw});
            console.log("응답", res)

            if(res.result === "failed" || !res.message){
                console.log(res.error)
                return;
            }
            const {message: {nickname, profileImg, seflIntruduction}} = res;
            await setStorage("userToken", {id, pw});
            dispatch({ type: 'SIGN_IN', userToken: { id, nickname, profileImg, seflIntruduction} });
        },
        signOut: async () => {
            await rmStorage("userToken");
            dispatch({ type: 'SIGN_OUT' })
        },
        signUp: async (data) => {
            const tmpUser = { name: "tmpSignup" }
            await setStorage("userToken", tmpUser);
            dispatch({ type: 'SIGN_IN' });
        },
    }), []);

    return (
        <AuthContext.Provider value={{ auth, useAuth }}>
            {children}
        </AuthContext.Provider>
    )
}


export { AuthContext, useAuthContext, AuthContextProvider }
