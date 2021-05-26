import React, { RefObject, useEffect, useRef, useState } from 'react'
import { Image, Text } from 'react-native'
import styled from 'styled-components/native'
import ConfettiCannon from 'react-native-confetti-cannon';
import { getRandomCat } from '../../api'
import { ClearButton, DefaultAlert, soundPath } from '../../atoms'
import LoadingModal from '../LoadingModal'
import { Audio } from "expo-av"
import { useLoadingContext, mainNavigation } from '../../useHook'

interface Props {

}

const soundList = [...Object.values(soundPath)]

const GameTest = (props: Props) => {
    const mainNav = mainNavigation();
    const [sound, setSound] = useState<Audio.Sound>();

    const { data, err, loading, refetch } = getRandomCat();
    const { useLoading: { startLoading, endLoading } } = useLoadingContext();

    const ref = useRef<ConfettiCannon>(null);

    // 메모리 누수 방지, 다음 차례의 effect를 실행하기 전에 이전의 렌더링에서 파생된 effect 또한 정리
    useEffect(() => {
        return sound ? stopSound : undefined;
    }, [sound])
    useEffect(() => {
        loading ? startLoading() : endLoading();
    }, [loading]);

    const playSound = async () => {
        try {
            const path = soundList[Math.floor(Math.random() * soundList.length)]
            const { sound } = await Audio.Sound.createAsync(path, { isLooping: true });
            setSound(sound);
            await sound.playAsync();
        } catch (error) {
            console.error(error);
        }
    }
    const stopSound = () => {
        sound?.unloadAsync();
    }
    const onPressRandom = () => {
        stopSound();
        refetch();
        playSound();
    }

    return (
        <Container>

            <ClearButton
                title="play"
                onPress={() => mainNav.navigate('GameNav', { screen: "GamePlayStack" })} />

            <ClearButton
                title="RANDOM"
                onPress={onPressRandom} />
            <Image source={{ uri: data ? data.file : null }}
                style={{ width: 200, height: 200 }} />
            <Text>{loading ? "loading" : " "}</Text>
            <Text> {err} </Text>

            <LoadingModal loading={loading} />

            <ClearButton
                title="STOP SOUND"
                onPress={stopSound}
            />

            <ClearButton
                title="CLEAR"
                onPress={() => {
                    ref.current?.start()
                    DefaultAlert({title: "퀴즈를 푸셨습니다!"})
                }}
            />

            <ConfettiCannon
                count={200}
                origin={{ x: 100, y: 0 }}
                autoStart={false}
                fadeOut
                ref={ref}
            />

        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`
export default GameTest;