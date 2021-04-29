import React from 'react'
import { createStackNavigator, HeaderBackButton, StackHeaderLeftButtonProps, StackHeaderStyleInterpolator } from '@react-navigation/stack';
import MakeCampagin from '../components/MakeCampagin/MakeCampagin';
import MakeCoupon from '../components/MakeCampagin/MakeCoupon';
import MakePinPoint from '../components/MakeCampagin/MakePinPoint';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const Stack = createStackNavigator();

const MakeCampaginStack = () => {
    const CloseIcon = ({ onPress }: StackHeaderLeftButtonProps) => (
        <TouchableOpacity onPress={onPress}>
            <EvilIcons name="close" size={25} style={{ marginLeft: 5 }} />
        </TouchableOpacity>
    )
    return (
        <Stack.Navigator screenOptions={{ headerTitleStyle: { fontFamily: "SCDream5", fontSize: 15 }, headerBackTitleVisible: false }}>
            <Stack.Screen
                name="MakeCampagin"
                component={MakeCampagin}
                options={{ headerTitle: "캠페인 만들기", headerLeft: CloseIcon }}
            />
            <Stack.Screen
                name="MakePinPoint"
                component={MakePinPoint}
                options={{ headerTitle: "핀포인트 만들기" }}
            />
            <Stack.Screen
                name="MakeCoupon"
                component={MakeCoupon}
                options={{ headerTitle: "쿠폰 만들기" }}
            />
        </Stack.Navigator>
    )
}
export default MakeCampaginStack;