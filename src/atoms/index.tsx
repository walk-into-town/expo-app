import { LightSearchBarProps } from '@types'
import React from 'react'
import { TextInputProps, View } from 'react-native'
import { Button, ButtonProps, Image, Input, SearchBar } from "react-native-elements"

export const TextArea = (option: TextInputProps) => (
    <Input
        multiline
        numberOfLines={4}
        style={{height: 100}}
        {...option}
    />
)

export const OutLineButton = (props: ButtonProps) => (
    <View style={{width: '100%', alignSelf: 'center'}}>
        <Button type="outline" {...props} />
    </View>
)
export const SubmitButton = (props: ButtonProps) => (
    <View style={{width: '100%', position: "absolute", bottom: 20}}>
        <Button {...props}/>
    </View>
)
export const NextButton = (props: { onPress: () => void }) => (
    <Image
        onPress={props.onPress}
        source={require('../../assets/next.png')}
        style={{ width: 170, height: 77 }} />
)

export const LightSearchBar = (option: LightSearchBarProps) => {
    option = {
        ...option,
        placeholder: "검색어",
        cancelButtonTitle: "취소",
    }
    return (
        <SearchBar
            platform="ios"
            containerStyle={{ backgroundColor: "transparent" }}
            {...option}
        />
    )
}