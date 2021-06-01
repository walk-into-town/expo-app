import React, { useEffect, useRef, useState } from 'react'
import { Image, Text } from 'react-native'
import styled from 'styled-components/native'
import { getRandomCat } from '../../api'
import { ClearButton, DefaultAlert } from '../../atoms'
import { useLoadingContext, mainNavigation, useSound } from '../../useHook'
import LottieView from "lottie-react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { animationPath } from '../../util';

interface Props {

}


const GameTest = (props: Props) => {
    const mainNav = mainNavigation();
    const Heart = useRef<LottieView>(null);

    const [isLiked, setIsLiked] = useState(false);
    const toggleLinked = () => {
        if (isLiked)
            Heart.current?.play(130, 30);
        else
            Heart.current?.play(30, 130);
        setIsLiked(!isLiked)
    }


    const { playSound, stopSound } = useSound();
    const { data, err, loading, refetch } = getRandomCat();
    const { useLoading: { startLoading, endLoading } } = useLoadingContext();

    useEffect(() => {
        loading ? startLoading() : endLoading();
    }, [loading]);

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
                    mainNav.navigate("GameNav", { screen: "GameClear" })
                }}
            />

            <TouchableOpacity onPress={toggleLinked}>
                <LottieView
                    ref={Heart}
                    style={{ width: 100, height: 100 }}
                    source={animationPath.heart}
                    autoPlay={false}
                    loop={false}
                />
            </TouchableOpacity>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`
export default GameTest;