import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { ClearButton, EvilIcons, SubTitle, Text1, Title } from '../../atoms'
import { useLoadingContext } from '../../useHook'

const NyanCat = () => {
    const { useLoading: { endLoading, startLoading } } = useLoadingContext()
    const nav = useNavigation()

    const onPress = () => {
        startLoading()
        setTimeout(() => endLoading(), 1000)
    }

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

            <Pressable onPress={onPress} style={{ alignItems: "center" }}>
                <EvilIcons name="pointer" size={100} />
                <SubTitle>Click Me</SubTitle>
            </Pressable>

            <View style={{ position: "absolute", bottom: 10 }}>
                <ClearButton title="뒤로 가기" onPress={nav.goBack} />
                <Text1>이미지와 음원은 모두 nyan cat에서 가져왔습니다.</Text1>
            </View>

        </View>
    )
}

export default NyanCat
