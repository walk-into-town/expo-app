import { IAuthContext, IUseAuth, IUser } from "@types";
import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { getStorage, setStorage, rmStorage } from "./AsyncStorage";

const AuthContext = createContext<IAuthContext | null>(null);

const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error('Cannot find AuthContext');

    return context;
}

const AuthContextProvider = ({ children }: { children: JSX.Element }) => {

    const reduce = (prevState: any, action: { type: string; userToken?: IUser; }) => {
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
        signIn: async (data) => {
            const {id, pw} = data;
            const tmpUser = { name: id, pw}
            await setStorage("userToken", tmpUser);
            dispatch({ type: 'SIGN_IN', userToken: tmpUser });
        },
        signOut: async () => {
            await rmStorage("userToken");
            dispatch({ type: 'SIGN_OUT' })
        },
        signUp: async (data) => {
            const tmpUser = { name: "tmpSignup" }
            await setStorage("userToken", tmpUser);
            dispatch({ type: 'SIGN_IN', userToken: tmpUser });
        },
    }), []);

    return (
        <AuthContext.Provider value={{ auth, useAuth }}>
            {children}
        </AuthContext.Provider>
    )
}


export { AuthContext, useAuthContext, AuthContextProvider }
