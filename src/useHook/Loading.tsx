import { ILoadingContext, LoadingReduce } from "@types";
import React, { createContext, useContext, useMemo, useReducer } from "react";
import LoadingModal from "../components/LoadingModal";

const LoadingContext = createContext<ILoadingContext | null>(null);

const useLoadingContext = () => {
    const context = useContext(LoadingContext);
    if (!context)
        throw new Error('Cannot find AuthContext');

    return context;
}

const LoadingContextProvider = ({ children }: { children: JSX.Element }) => {

    const reduce: LoadingReduce = (_, action) => {
        switch (action.type) {
            case 'START':
                return {
                    isLoading: true,
                };
            case 'END':
                return {
                    isLoading: false,
                }
        }
    }
    const [loading, dispatch] = useReducer(reduce, {
        isLoading: false,
    });

    const useLoading = useMemo(() => ({
        startLoading: () => {
            dispatch({ type: "START" });
        },
        endLoading: () => {
            dispatch({ type: "END" })
        }
    }), []);

    return (
        <LoadingContext.Provider value={{ loading, useLoading }}>
            <LoadingModal loading={loading.isLoading} />
            {children}
        </LoadingContext.Provider>
    )
}

export { LoadingContext, useLoadingContext, LoadingContextProvider }