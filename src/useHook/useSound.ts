import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react'
import { soundPath } from '../util';

export const useSound = (soundFile?: any) => {
    const [sound, setSound] = useState<Audio.Sound>();

    // 메모리 누수 방지, 다음 차례의 effect를 실행하기 전에 이전의 렌더링에서 파생된 effect 또한 정리
    useEffect(() => {
        return sound ? stopSound : undefined;
    }, [sound])


    const playSound = () => {
        const init = async () => {
            try {
                const soundList = [...Object.values(soundPath)]
                const path = soundList[Math.floor(Math.random() * soundList.length)]
                const { sound } = await Audio.Sound.createAsync(path, { isLooping: true });
                setSound(sound);
                await sound.playAsync();
            } catch (error) {
                console.error(error);
            }
        }
        init();
    }
    const stopSound = () => {
        const init = async () => {
            await sound?.unloadAsync();
        }
        init();
    }
    return { playSound, stopSound }
}

export const useBackGroundSound = () => {
    return useSound(soundPath.jamaicn)
}
