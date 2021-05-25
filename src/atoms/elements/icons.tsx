import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colorCode } from '../color';
export { FontAwesome, EvilIcons, Ionicons, Feather };

type HeaderIconProps = {
    onPress?: () => void,
    toggle?: boolean, // true이면 아이콘 아웃라인이 없다
    color?: string,
    size?: number
}
export const HeaderLeftCloseIcon = (props: HeaderIconProps) => (
    <TouchableOpacity onPress={props.onPress} >
        <EvilIcons
            name={props.toggle ? "close" : "close-o"}
            size={props.size || 25}
            color={props.color || colorCode.primary}
            style={{ marginLeft: 4 }}
        />
    </TouchableOpacity >
)

export const HeaderLeftBackIcon = ({ onPress }: StackHeaderLeftButtonProps) => (
    <TouchableOpacity onPress={onPress} >
        <EvilIcons name="arrow-left" size={25} color={colorCode.primary} style={{ marginLeft: 4 }} />
    </TouchableOpacity >
)

export const HeaderRightCheckIcon = ({ onPress }: { onPress: () => void }) => (
    <TouchableOpacity onPress={onPress} >
        <EvilIcons name="check" size={25} color={colorCode.primary} style={{ marginRight: 4 }} />
    </TouchableOpacity >
)

export const RateStarIcon = ({ toggle, size }: { toggle?: boolean, size?: number }) => (
    <FontAwesome name={toggle ? "star" : "star-o"} size={size || 17} style={{ color: colorCode.primary }} />
)

export const LikeIcon = ({ toggle, size }: { toggle?: boolean, size?: number }) => (
    <FontAwesome name={toggle ? "heart" : "heart-o"} size={size || 17} style={{ color: colorCode.primary }} />
)