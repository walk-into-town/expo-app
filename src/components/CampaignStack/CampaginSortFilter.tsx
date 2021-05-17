import { CampaginSearchCondition, CampaginSearchType, TuseState } from '@types'
import React from 'react'
import { View } from 'react-native'
import { BadgeButton } from '../../atoms'

interface Props {
    useType: TuseState<CampaginSearchType>
    useCondition: TuseState<CampaginSearchCondition>
}

const CampaginSortFilter = (props: Props) => {
    const [type, setType] = props.useType;
    const [condition, setCondition] = props.useCondition;
    
    return (
        <View style={{ flexDirection: 'row', marginHorizontal: 10, marginBottom: 10 }}>
            <BadgeButton title="검색조건" onPress={() => console.log("adsf")} />

        </View>
    )
}

export default CampaginSortFilter
