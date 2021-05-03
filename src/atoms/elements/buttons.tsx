import React from 'react';
import { SubmitButtonProps } from "@types"
import { View } from "react-native"
import { ButtonProps } from "react-native-elements"
import { Button } from "react-native-elements/dist/buttons/Button"

export const OutLineButton = (props: ButtonProps) => (
    <View style={{ width: '100%', alignSelf: 'center' }}>
        <Button
            type="outline"
            titleStyle={{ fontFamily: "SCDream8" }}
            {...props}
        />
    </View>
)
export const ClearButton = (props: ButtonProps) => (
    <Button
        type="clear"
        titleStyle={{ fontFamily: "SCDream8" }}
        {...props} />
)
export const SubmitButton = (props: SubmitButtonProps) => (
    <Button
        title={props.title}
        onPress={props.onPress}
        style={{ marginVertical: 30 }}
        titleStyle={{ fontFamily: "SCDream7" }}
        {...props.option}
    />
)