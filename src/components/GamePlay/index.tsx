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


    const playSound = async() => {
        try {
            const { sound } = await Audio.Sound.createAsync(require('../../../assets/sound/balloon.mp3'));
            setSound(sound);
        } catch (error) {
            console.error(error)
        }
    }



    return (
        <Container>
            <ClearButton
                title="play"
                onPress={() => navigation.navigate("Game")} />
            <ClearButton
                title="RANDOM"
                onPress={refetch} />
            <Image source={{ uri: data ? data.file : null }}
                style={{ width: 200, height: 200 }} />
            <Text>{loading ? "loading" : " "}</Text>
            <Text> {err} </Text>

            <LoadingModal loading={loading} />

            <ClearButton
                title="PLAY SOUND"
                onPress={playSound}  />

        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`
