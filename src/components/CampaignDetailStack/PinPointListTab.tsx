import { PinPoint } from '@types'
import React from 'react'
import { View } from 'react-native'
import { DefaultListItem, SubTitle } from '../../atoms'

interface Props {
    pinPointList: PinPoint[],
    navtoPinPointDetail: (pinpoint: PinPoint) => void
    refreshing: boolean
}

const PinPointListTab = ({ pinPointList, navtoPinPointDetail, refreshing }: Props) => {
    if (refreshing)
        return <View style={{ height: 45, alignItems: "center", justifyContent: "center" }}>
            <SubTitle>로딩중</SubTitle>
        </View>

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
