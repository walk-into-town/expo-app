import { PinPoint } from '@types'
import React from 'react'
import { View, Text } from 'react-native'
import { ListItem } from 'react-native-elements/dist/list/ListItem'

interface Props {
    pinPointList: PinPoint[]
}

const PinPointListTab = (props: Props) => {
    return (
        <View>
            {
                props.pinPointList.map((v, idx) => {
                    <ListItem key={idx}>
                        <ListItem.Title>
                            {v.name}
                        </ListItem.Title>
                    </ListItem>
                })
            }
        </View>
    )
}

export default PinPointListTab
