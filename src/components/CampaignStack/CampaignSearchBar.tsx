import React, { useState } from 'react'
import { TuseState } from '@types'
import { View } from 'react-native'
import { LightSearchBar } from '../../atoms'

interface Props {
    useSearchText: TuseState<string>
}

const CampaignSearchBar = (props: Props) => {
    const [text, setText] = props.useSearchText;
    const [value, setValue] = useState(text);

    return (
        <View style={{ width: "100%" }}>
            <LightSearchBar
                value={value}
                onSubmitEditing={() => setText(value)}
                onChangeText={(text: string) => setValue(text)}
                showLoading={false}
            />
        </View>
    )
}

export default CampaignSearchBar
