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
export const ClearButton = (props: ButtonProps & { color?: string, size?: number }) => (
    <Button
        type="clear"
        titleStyle={{ fontFamily: "SCDream8", color: props.color || colorCode.primary, fontSize: props.size || 18 }}
        {...props}
    />
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

export const BadgeButton = (props: BadgeButtonProps) => {
    const color = props.color || colorCode.primary;
    const mainColor = props.backgroundToggle ? "white" : color;
    const backgroundColor = props.backgroundToggle ? color : "transparent";

    return <Button
        title={props.title}
        onPress={props.onPress}
        type="clear"
        buttonStyle={{ borderRadius: 50, borderColor: mainColor, borderWidth: .7, backgroundColor }}
        titleStyle={{ fontFamily: "SCDream7", fontSize: 12, color: mainColor }}
        {...props.option}
    />
}

type ButtonTabProps = {
    selectedIndex: number;
    onPress: (v: number) => void;
    buttons: string[],
    viewList: JSX.Element[],
    isFullHigh?: boolean
}
export const ButtonTabs = (props: ButtonTabProps) => (
    <View style={{ backgroundColor: "white", height: props.isFullHigh ? "100%" : undefined }}>
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