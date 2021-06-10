import { IBGMContext } from "@types";
import React, { createContext, useContext, useEffect } from "react";
import { getStorage, setStorage } from "../util/AsyncStorage";
import { useAuthContext } from "./Auth";
import { useBackGroundSound } from "./useSound";

const BGMContext = createContext<IBGMContext | null>(null);

const useBGMContext = () => {
    const context = useContext(BGMContext);
    if (!context) throw new Error('Cannot find AuthContext');

    return context;
}

const BGMContextProvider = ({ children }: { children: JSX.Element }) => {
    const BGM = useBackGroundSound()
    const { auth: { userToken } } = useAuthContext()

    const playSound = () => BGM.playSound();

    const stopSound = () => BGM.stopSound();

    useEffect(() => {
        if (userToken === undefined || userToken.setting.playBGM)
            playSound();
    }, [userToken?.setting.playBGM])

    return (
        <BGMContext.Provider value={{ playSound, stopSound }}>
            {children}
        </BGMContext.Provider>
    )
}

export { BGMContext, useBGMContext, BGMContextProvider }