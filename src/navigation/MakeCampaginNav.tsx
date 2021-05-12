import React from 'react'
import { createStackNavigator, StackHeaderLeftButtonProps } from '@react-navigation/stack';
import MakeCampaginStack from '../container/MakeCampaginNav/MakeCampaginStack';
import MakePinPointStack from '../container/MakeCampaginNav/MakePinPointStack';
import MakeCouponStack from '../container/MakeCampaginNav/MakeCouponStack';
import FindPinPointLocationStack from '../container/MakeCampaginNav/FindPinPointLocationStack';
import { colorCode, HeaderLeftCloseIcon, HeaderLeftBackIcon } from '../atoms';

const Stack = createStackNavigator();

const MakeCampaginNav = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleStyle: { fontSize: 15, color: colorCode.primary },
                headerBackTitleVisible: false,
                headerLeft: HeaderLeftBackIcon
            }}
        >
            <Stack.Screen
                name="MakeCampaginStack"
                component={MakeCampaginStack}
                options={{ headerTitle: "캠페인 만들기", headerLeft: HeaderLeftCloseIcon }}
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
            <Stack.Screen
                name="FindPinPointLocationStack"
                component={FindPinPointLocationStack}
                options={{ headerTitle: "핀포인트 위치 찾기" }}
            />
        </Stack.Navigator>
    )
}
export default MakeCampaginNav;