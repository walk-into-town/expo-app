import { PinPoint } from '@types'
import React from 'react'
import { View } from 'react-native'
import { DefaultListItem, LoadingCircle, SubTitle } from '../../atoms'

interface Props {
    pinPointList: PinPoint[],
    navtoPinPointDetail: (pinpoint: PinPoint) => void
    refreshing: boolean
}

const PinPointListTab = ({ pinPointList, navtoPinPointDetail, refreshing }: Props) => {
    if (refreshing)
        return <LoadingCircle size={50}/>

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
