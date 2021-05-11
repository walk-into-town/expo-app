import React from 'react'
import { Animated, View } from 'react-native'
import { ListItem } from 'react-native-elements';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { colorCode } from '../color';

interface DefaultListItemProps {
    title: string,
    onPress: () => void
}
export const DefaultListItem = ({ title, onPress }: DefaultListItemProps) => {
    return (
        <ListItem
            bottomDivider
            onPress={onPress}
            containerStyle={{ backgroundColor: "white" }}
        >
            <ListItem.Content>
                <ListItem.Subtitle style={{ fontFamily: "SCDream4", fontSize: 13 }}>{title}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    )
}

interface SimpleSwapListItemProps {
    text: string;
    onText: () => void;
    onDelete: () => void;
}
export const SimpleSwapListItem = ({ text, onText, onDelete }: SimpleSwapListItemProps) => {

    const renderRightActions = (progress: Animated.AnimatedInterpolation, dragX: Animated.AnimatedInterpolation) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [64, 0],
        });
        return (
            <View style={{ width: 80, flexDirection: 'row-reverse', }}>
                <Animated.Text style={{ transform: [{ translateX: trans }] }}>
                    <ListItem containerStyle={{ backgroundColor: "transparent" }}>
                        <ListItem.Title onPress={onDelete} style={{ color: colorCode.appleRed }}>삭제</ListItem.Title>
                    </ListItem>
                </Animated.Text>
            </View>
        );
    };

    return (
        <Swipeable renderRightActions={renderRightActions}>
            <ListItem containerStyle={{ backgroundColor: "transparent" }}>
                <ListItem.Title onPress={onText}>{text}</ListItem.Title>
            </ListItem>
        </Swipeable>
    )
}