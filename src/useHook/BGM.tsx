import { IBGMContext } from "@types";
import React, { createContext, useContext, useEffect } from "react";
import { getStorage, setStorage } from "../util/AsyncStorage";
import { useBackGroundSound } from "./useSound";

const BGMContext = createContext<IBGMContext | null>(null);

const useBGMContext = () => {
    const context = useContext(BGMContext);
    if (!context) throw new Error('Cannot find AuthContext');

    return context;
}

const BGMContextProvider = ({ children }: { children: JSX.Element }) => {
    const BGM = useBackGroundSound()
    const playSound = () => {
        const init = async () => {
            await setStorage("playBGM", { play: true })
            BGM.playSound();
        }
        init();
    }
    const stopSound = () => {
        const init = async () => {
            setStorage("playBGM", { play: false })
            BGM.stopSound();
        }
        init();
    }

    useEffect(() => {
        const init = async () => {
            const storage = await getStorage("playBGM");
            if (!storage || storage.play)
                playSound();
        }
        init();
    }, [])

    return (
        <BGMContext.Provider value={{ playSound, stopSound }}>
            {children}
        </BGMContext.Provider>
    )
}

export { BGMContext, useBGMContext, BGMContextProvider }