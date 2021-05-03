import React from 'react'
import { Animated, View } from 'react-native'
import { ListItem } from 'react-native-elements';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { colorCode } from './color';

interface Props {
    text: string;
    onText: () => void;
    onDelete: () => void;
}

const SimpleSwapListItem = ({ text, onText, onDelete }: Props) => {

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

export default SimpleSwapListItem
