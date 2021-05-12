import React from 'react'
import { TuseState } from '@types'
import { View } from 'react-native'
import { LightSearchBar } from '../../atoms'

interface Props {
    useValue: TuseState<string>,
    useSearchText: TuseState<string>
}

const CampaignSearchBar = (props: Props) => {
    const [value, setValue] = props.useValue;
    const [text, setText] = props.useSearchText;

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
