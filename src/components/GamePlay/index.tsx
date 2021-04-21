import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Button, Text } from 'react-native'
import { Image } from 'react-native-elements'
import styled from 'styled-components/native'
import { getRandomCat } from '../../api'
import useFetch from '../../api/useFetch'
import LoadingModal from '../../atoms/LoadingModal'

interface Props {

}

export default (props: Props) => {
    const navigation = useNavigation();
    const { data, err, loading, refetch } = getRandomCat();

    return (
        <Container>
            <Text>Map</Text>
            <Button
                title="play"
                onPress={() => navigation.navigate("Game")} />
            <Button
                title="RANDOM"
                onPress={refetch} />
            <Image source={{ uri: data ? data.file : null }}
                style={{ width: 200, height: 200 }} />
            <Text>{loading ? "loading" : " "}</Text>
            <Text> {err} </Text>
            
            <LoadingModal loading={loading}/>

        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`
