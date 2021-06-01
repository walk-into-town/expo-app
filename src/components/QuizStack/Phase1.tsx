import React from 'react'
import { View, Text } from 'react-native'
import { ClearButton, SubTitle } from '../../atoms'
import LottieView from "lottie-react-native"
import { animationPath } from '../../util'

interface Props {
    monsterImg: string
    nextPhase: () => void
}

const Phase1 = (props: Props) => {
    return (
        <View style={{ alignItems: "center" }}>
            <View style={{ marginVertical: 20 }}>
                <LottieView
                    source={animationPath.ninja}
                    autoPlay
                    loop
                    style={{ width: 150, height: 150 }}
                />
            </View>
            <SubTitle></SubTitle>
            <ClearButton title="NEXT" onPress={props.nextPhase} />
        </View>
    )
}

export default Phase1
