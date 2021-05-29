import React from 'react'
import { View, Text } from 'react-native'
import { ClearButton } from '../../atoms'

interface Props {
    monsterImg: string
    nextPhase: () => void
}

const Phase1 = (props: Props) => {
    return (
        <View>
            <ClearButton title="NEXT" onPress={props.nextPhase} />
        </View>
    )
}

export default Phase1
