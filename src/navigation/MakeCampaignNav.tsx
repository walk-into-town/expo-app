import React from 'react'
import { createStackNavigator, StackHeaderLeftButtonProps } from '@react-navigation/stack';
import MakeCampaignStack from '../container/MakeCampaignNav/MakeCampaignStack';
import MakePinPointStack from '../container/MakeCampaignNav/MakePinPointStack';
import MakeCouponStack from '../container/MakeCampaignNav/MakeCouponStack';
import FindPinPointLocationStack from '../container/MakeCampaignNav/FindPinPointLocationStack';
import { colorCode, HeaderLeftCloseIcon, HeaderLeftBackIcon } from '../atoms';

const Stack = createStackNavigator();

const MakeCampaignNav = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleStyle: { fontSize: 15, color: colorCode.primary },
                headerBackTitleVisible: false,
                headerLeft: HeaderLeftBackIcon
            }}
        >
            <Stack.Screen
                name="MakeCampaignStack"
                component={MakeCampaignStack}
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
export default MakeCampaignNav;