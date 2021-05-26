import React, { useEffect, useRef, useState } from 'react'
import { Image, Text } from 'react-native'
import styled from 'styled-components/native'
import ConfettiCannon from 'react-native-confetti-cannon';
import { getRandomCat } from '../../api'
import { ClearButton, DefaultAlert } from '../../atoms'
import { useLoadingContext, mainNavigation, useSound } from '../../useHook'

interface Props {

}


const GameTest = (props: Props) => {
    const mainNav = mainNavigation();
    const ref = useRef<ConfettiCannon>(null);

    const { playSound, stopSound } = useSound();
    const { data, err, loading, refetch } = getRandomCat();
    const { useLoading: { startLoading, endLoading } } = useLoadingContext();

    useEffect(() => {
        loading ? startLoading() : endLoading();
    }, [loading]);

    useEffect(() => {
        playSound();
        return () => stopSound();
    }, [])


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
                onPress={onPressRandom}
            />
            <Image source={{ uri: data ? data.file : null }}
                style={{ width: 200, height: 200 }} />
            <Text> {err} </Text>

            <ClearButton
                title="STOP SOUND"
                onPress={stopSound}
            />


            <ClearButton
                title="CLEAR"
                onPress={() => {
                    ref.current?.start()
                    DefaultAlert({ title: "퀴즈를 푸셨습니다!" })
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