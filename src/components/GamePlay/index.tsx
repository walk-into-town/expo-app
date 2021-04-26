import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Button, Image, Text } from 'react-native'
import styled from 'styled-components/native'
import { getRandomCat } from '../../api'
import { ClearButton } from '../../atoms'
import LoadingModal from '../LoadingModal'
import { Audio } from "expo-av"
import { soundPath } from '../../atoms/paths'

interface Props {

}

const soundList = [...Object.values(soundPath)]

export default (props: Props) => {
    const navigation = useNavigation();
    const [sound, setSound] = useState<Audio.Sound>();

    const { data, err, loading, refetch } = getRandomCat();

    useEffect(() => {
        playSound();
    }, [])
    // 메모리 누수 방지, 다음 차례의 effect를 실행하기 전에 이전의 렌더링에서 파생된 effect 또한 정리
    useEffect(() => {
        return sound ? stopSound : undefined;
    }, [sound])

    const playSound = async() => {
        try {
            const path = soundList[Math.floor(Math.random() * soundList.length)]
            const { sound } = await Audio.Sound.createAsync(path, {isLooping: true});
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
                onPress={() => navigation.navigate("Game")} />

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
                onPress={stopSound}/>

        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`
