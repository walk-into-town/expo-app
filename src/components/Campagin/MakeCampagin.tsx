import React from 'react'
import { View, Text } from 'react-native'
import { Input } from 'react-native-elements'

const MakeCampagin = () => {
    return (
        <View>
            <Input
                containerStyle={{}}
                inputContainerStyle={{}}
                errorMessage=""
                inputStyle={{}}
                placeholder="캠페인 이름" />
            <Input
            
                placeholder="사진" />
            <Input
                multiline
                numberOfLines={4}
                placeholder="캠페인 설명" />
        </View>
    )
}

export default MakeCampagin
