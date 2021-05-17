import { PinPoint } from '@types'
import React from 'react'
import { View } from 'react-native'
import { DefaultListItem } from '../../atoms'

interface Props {
    pinPointList: PinPoint[]
}

const PinPointListTab = ({ pinPointList }: Props) => {
    return (
        <View>
            {
                pinPointList.map((v, idx) => (
                    <DefaultListItem 
                        key={idx} 
                        title={v.name}
                        onPress={() => console.log(v.id)}
                    />
                ))
            }
        </View>
    )
}

export default PinPointListTab
