import React from 'react';
import { BadgeButtonProps, SubmitButtonProps } from "@types"
import { View } from "react-native"
import { Button, ButtonGroup, ButtonProps } from "react-native-elements"
import { colorCode } from '../color';

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

export const BadgeButton = (props: BadgeButtonProps) => (
    <Button
        title={props.title}
        onPress={props.onPress}
        type="clear"
        buttonStyle={{ borderRadius: 50, borderColor: colorCode.primary, borderWidth: .7 }}
        titleStyle={{ fontFamily: "SCDream7", fontSize: 12, color: colorCode.primary }}
        {...props.option}
    />
)

type ButtonTabProps = {
    selectedIndex: number;
    onPress: (v: number) => void;
    buttons: string[],
    viewList: JSX.Element[]
}
export const ButtonTabs = (props: ButtonTabProps) => (
    <View style={{ backgroundColor: "white" }}>
        <ButtonGroup
            selectedIndex={props.selectedIndex}
            onPress={props.onPress}
            buttons={props.buttons}
            innerBorderStyle={{ width: 0 }}
            containerStyle={{ marginVertical: 0, marginHorizontal: 0, borderWidth: 0, height: 50 }}
            buttonStyle={{ borderBottomWidth: 1, borderColor: "#ececec" }}
            textStyle={{ fontSize: 14, fontFamily: "SCDream6" }}
            selectedTextStyle={{ color: "black", fontWeight: "bold" }}
            selectedButtonStyle={{
                backgroundColor: "white",
                borderTopWidth: 1.5,
                borderTopColor: "black",
                borderRightWidth: 1,
                borderLeftWidth: 1,
                borderBottomWidth: 0,
            }}
        />
        {props.viewList[props.selectedIndex]}
    </View>
)