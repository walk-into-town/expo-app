import React from 'react'
import { TextInputProps } from 'react-native'
import { Input } from "react-native-elements"


export const TextArea = (option:TextInputProps) => {
    return (
        <Input
            multiline
            numberOfLines={4}
            inputStyle={{ textAlign: "center" }}
            {...option}
        />
    )
}