import React, { useState } from 'react'
import { View } from 'react-native'
import { SearchBar, Text } from 'react-native-elements'
import { LightSearchBar } from '../../atoms'

const SearchCampagin = () => {
    const [value, setValue] = useState("")
    const [test, setTest] = useState("")
    return (
        <View style={{width: "100%"}}>
            <LightSearchBar
                value={value}
                onSubmitEditing={() => setTest(value)}
                onChangeText={(text: string) => setValue(text)}
                showLoading={false}
            />
            <Text style={{textAlign: "center"}}>{test}</Text>
        </View>
    )
}

export default SearchCampagin
