import { PinPoint } from '@types'
import React from 'react'
import { View } from 'react-native'
import { DefaultListItem } from '../../atoms'

interface Props {
    pinPointList: PinPoint[],
    navtoPinPointDetail: (pinpoint: PinPoint) => void
}

const PinPointListTab = ({ pinPointList, navtoPinPointDetail }: Props) => {

    return (
        <View>
            {
                pinPointList.map((v, idx) => (
                    <DefaultListItem
                        key={idx}
                        title={v.name}
                        onPress={() => navtoPinPointDetail(v)}
                    />
                ))
            }
        </View>
    )
}

export default PinPointListTab
