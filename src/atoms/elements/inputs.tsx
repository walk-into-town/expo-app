import React from 'react';
import { LightSearchBarProps } from "@types"
import { TextInputProps } from "react-native"
import { Input, SearchBar } from "react-native-elements"

export const WhiteInput = (option: TextInputProps) => (
    <Input
        placeholder="아이디"
        selectionColor={"#FFF"}
        inputStyle={{ color: "#FFF", fontSize: 25, fontFamily: "SCDream5" }}
        autoCapitalize="none"
        {...option}
    />
)

export const TextArea = (option: TextInputProps) => (
    <Input
        multiline
        numberOfLines={4}
        style={{ height: 100 }}
        autoCapitalize="none"
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