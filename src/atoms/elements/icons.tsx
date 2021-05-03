import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';
export { FontAwesome, EvilIcons, Ionicons };

export const HeaderLeftCloseIcon = () => (
    <View>
        <EvilIcons name="close" size={30} style={{ color: "blue" }} />
    </View>
)
