import React from 'react'
import { createStackNavigator, StackHeaderLeftButtonProps } from '@react-navigation/stack';
import MakeCampaginStack from '../container/MakeCampaginNav/MakeCampaginStack';
import MakePinPointStack from '../container/MakeCampaginNav/MakePinPointStack';
import MakeCouponStack from '../container/MakeCampaginNav/MakeCouponStack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const Stack = createStackNavigator();

const MakeCampaginNav = () => {
    const CloseIcon = ({ onPress }: StackHeaderLeftButtonProps) => (
        <TouchableOpacity onPress={onPress}>
            <EvilIcons name="close" size={25} style={{ marginLeft: 4 }} />
        </TouchableOpacity>
    )
    return (
        <Stack.Navigator screenOptions={{ headerTitleStyle: { fontSize: 15 }, headerBackTitleVisible: false }}>
            <Stack.Screen
                name="MakeCampaginStack"
                component={MakeCampaginStack}
                options={{ headerTitle: "캠페인 만들기", headerLeft: CloseIcon }}
            />
            <Stack.Screen
                name="MakePinPointStack"
                component={MakePinPointStack}
                options={{ headerTitle: "핀포인트 만들기" }}
            />
            <Stack.Screen
                name="MakeCouponStack"
                component={MakeCouponStack}
                options={{ headerTitle: "쿠폰 만들기" }}
            />
        </Stack.Navigator>
    )
}
export default MakeCampaginNav;