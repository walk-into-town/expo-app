import React from 'react'
import { View } from 'react-native'
import { BadgeButton } from '../../atoms'

interface Props {

}

const CampaginSortFilter = (props: Props) => {
    return (
        <View style={{ flexDirection: 'row', marginHorizontal: 10, marginBottom: 10 }}>
            <BadgeButton title="검색조건" onPress={() => console.log("adsf")} />

        </View>
    )
}

export default CampaginSortFilter
