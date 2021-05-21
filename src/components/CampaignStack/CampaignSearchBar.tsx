import React, { useState } from 'react'
import { TuseState } from '@types'
import { View } from 'react-native'
import { LightSearchBar } from '../../atoms'

interface Props {
    useSearchText: TuseState<string>
    getSearchCampaign: () => void
}

const CampaignSearchBar = (props: Props) => {
    const [text, setText] = props.useSearchText;

    return (
        <View style={{ width: "100%" }}>
            <LightSearchBar
                value={text}
                onSubmitEditing={() => props.getSearchCampaign()}
                onChangeText={(text: string) => setText(text)}
                showLoading={false}
            />
        </View>
    )
}

export default CampaignSearchBar
