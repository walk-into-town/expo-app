import { LightSearchBarProps } from '@types'
import React from 'react'
import { TextInputProps } from 'react-native'
import { Button, ButtonProps, Input, SearchBar, SearchBarIosProps, SearchBarProps } from "react-native-elements"


export const TextArea = (option: TextInputProps) => (
    <Input
        multiline
        numberOfLines={4}
        inputStyle={{ textAlign: "center" }}
        {...option}
    />
)

export const NextButton = (option: ButtonProps) => (
    <Button
        title="다음"
        type="clear"
        {...option}
    />
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