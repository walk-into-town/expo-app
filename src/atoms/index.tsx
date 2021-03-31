import { LightSearchBarProps } from '@types'
import React from 'react'
import { TextInputProps, TouchableOpacity } from 'react-native'
import { ButtonProps, Image, Input, SearchBar, Text } from "react-native-elements"
import Icon from 'react-native-vector-icons/EvilIcons';

export const TextArea = (option: TextInputProps) => (
    <Input
        multiline
        numberOfLines={4}
        inputStyle={{ textAlign: "center" }}
        {...option}
    />
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