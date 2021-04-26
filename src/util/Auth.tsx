import { IAuthContext, IUseAuth, IUserToken } from "@types";
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

    const reduce = (prevState: any, action: { type: string; userToken?: IUserToken; }) => {
        switch (action.type) {
            case 'RESTORE_TOKEN':
                return {
                    ...prevState,
                    isLoading: false,
                    userToken: action.userToken,
                };
            case 'SIGN_IN':
                return {
                    ...prevState,
                    isSignout: false,
                    userToken: action.userToken,
                };
            case 'SIGN_OUT':
                return {
                    ...prevState,
                    isSignout: true,
                    userToken: undefined,
                };
        }
    }
    const [auth, dispatch] = useReducer(reduce, {
        isLoading: true,
        isSignout: false,
        userToken: null,
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
            const {data, err} = API.memberLogin(id, pw);
            
            if(data.result === "failed"){
                console.log(err)
                return;
            }

            await setStorage("userToken", {id, pw});
            dispatch({ type: 'SIGN_IN', userToken: undefined });
        },
        signOut: async () => {
            await rmStorage("userToken");
            dispatch({ type: 'SIGN_OUT' })
        },
        signUp: async (data) => {
            const tmpUser = { name: "tmpSignup" }
            await setStorage("userToken", tmpUser);
            dispatch({ type: 'SIGN_IN', userToken: undefined });
        },
    }), []);

    return (
        <AuthContext.Provider value={{ auth, useAuth }}>
            {children}
        </AuthContext.Provider>
    )
}


export { AuthContext, useAuthContext, AuthContextProvider }
