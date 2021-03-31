import React, { useState } from 'react'
import { View } from 'react-native'
import { SearchBar, Text } from 'react-native-elements'

const SearchCampagin = () => {
    const [value, setValue] = useState("")
    const [test, setTest] = useState("")
    return (
        <View style={{width: "100%"}}>
            <SearchBar
                containerStyle={{backgroundColor: "transparent"}}
                platform="ios"
                placeholder="검색어"
                value={value}
                onChangeText={newVal => setValue(newVal)}
                cancelButtonTitle={"취소"}
                showLoading={false}
                onSubmitEditing={() => setTest(value)}
            />
            <Text style={{textAlign: "center"}}>{test}</Text>
        </View>
    )
}

export default SearchCampagin
