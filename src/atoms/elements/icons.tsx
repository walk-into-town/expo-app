import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colorCode } from '../color';
export { FontAwesome, EvilIcons, Ionicons, Feather };

export const HeaderLeftCloseIcon = ({ onPress }: StackHeaderLeftButtonProps) => (
    <TouchableOpacity onPress={onPress} >
        <EvilIcons name="close-o" size={25} style={{ marginLeft: 4, color: colorCode.primary }} />
    </TouchableOpacity >
)

export const HeaderLeftBackIcon = ({ onPress }: StackHeaderLeftButtonProps) => (
    <TouchableOpacity onPress={onPress} >
        <EvilIcons name="arrow-left" size={25} style={{ marginLeft: 4, color: colorCode.primary }} />
    </TouchableOpacity >
)

export const RateStarIcon = () => (
    <FontAwesome name="star" size={17} style={{ color: colorCode.primary }} />
)
