import { IAuthContext, AuthReduce, UseAuth } from "@types";
import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { Alert } from "react-native";
import { API } from "../api";
import { getStorage, setStorage, rmStorage } from "../util/AsyncStorage";
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
            case "EDIT":
                return {
                    userToken: action.userToken
                }
        }
    }
    const [auth, dispatch] = useReducer(reduce, {
        userToken: undefined,
    });

    useEffect(() => {
        const bootAsync = async () => {
            const loginData = await getStorage("userToken")

            if (loginData === null)
                dispatch({ type: 'RESTORE_TOKEN' })
            else
                useAuth.signIn(loginData);
        };

        bootAsync();
    }, []);

    const useAuth: UseAuth = {
        signIn: async ({ id, pw }) => {
            startLoading();

            const { result, error, errdesc, data } = await API.memberLogin({ id, pw });
            dispatch({ type: "RESTORE_TOKEN" });

            if (result === "failed" || data === undefined)
                await rmStorage("userToken");
            else {
                const { nickname, profileImg, selfIntroduction } = data;
                await setStorage("userToken", { id, pw });
                dispatch({ type: 'SIGN_IN', userToken: { id, nickname, profileImg, selfIntroduction } });
            }
            endLoading();
            return errdesc ? errdesc : "";
        },
        signOut: ({ id }) => {
            const init = async () => {
                startLoading();

                const { result, error, errdesc } = await API.memberLogout({ id });
                if (result === 'failed')
                    Alert.alert(
                        error || "error",
                        errdesc || "",
                        [{ text: "확인", onPress: endLoading }]
                    );
                else {
                    dispatch({ type: 'SIGN_OUT' });
                    await rmStorage("userToken");
                }
                endLoading();
            }
            init();
        },
        onEdit: ({ nickname, profileImg, selfIntroduction }) => {
            if (auth.userToken === undefined)
                return;

            const id = auth.userToken.id;
            dispatch({ type: 'EDIT', userToken: { id, nickname, profileImg, selfIntroduction } })
        }
    }

    return (
        <AuthContext.Provider value={{ auth, useAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, useAuthContext, AuthContextProvider }