import { CampaignSearchCondition, CampaignSearchType, TuseState } from '@types'
import React from 'react'
import { View } from 'react-native'
import { BadgeButton } from '../../atoms'

interface Props {
    useType: TuseState<CampaignSearchType>
    useCondition: TuseState<CampaignSearchCondition>
}

const CampaignSortFilter = (props: Props) => {
    const [type, setType] = props.useType;
    const [condition, setCondition] = props.useCondition;

    return (
        <View style={{ flexDirection: 'row', marginHorizontal: 10, marginBottom: 10 }}>
            <BadgeButton title="검색조건" onPress={() => console.log("adsf")} />

        </View>
    )
}

export default CampaignSortFilter
