import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { colorCode, HeaderLeftBackIcon, HeaderLeftCloseIcon } from '../atoms';
import CampaignDetailStack from '../container/ModalNav/CampaignDetailStack';
import CouponDetailStack from '../container/ModalNav/CouponDetailStack';
import MyCouponStack from '../container/ModalNav/MyCouponStack';
import MyDetailStack from '../container/ModalNav/MyDetailStack';
import MyProfileEditStack from '../container/ModalNav/MyProfileEditStack';
import PinPointDetailStack from '../container/ModalNav/PinPointDetailStack';

interface Props {

}

const Stack = createStackNavigator();

const ModalNav = (props: Props) => {
    return (
        <Stack.Navigator screenOptions={{
            headerTitleStyle: { fontSize: 15, color: colorCode.primary },
            headerBackTitleVisible: false,
            headerLeft: HeaderLeftBackIcon
        }}>
            {/* 마이 페이지 */}
            <Stack.Screen
                name="MyDetailStack"
                component={MyDetailStack}
                options={{ headerTitle: "나의 캠페인" }}

            />
            <Stack.Screen
                name="MyCouponStack"
                component={MyCouponStack}
                options={{ headerTitle: "내 쿠폰" }}
            />
            <Stack.Screen
                name="MyProfileEditStack"
                component={MyProfileEditStack}
                options={{
                    headerTitle: "프로필 편집",
                    headerLeft: HeaderLeftCloseIcon,
                }}
            />

            {/* 캠페인 상세 페이지 */}
            <Stack.Screen
                name="CampaignDetailStack"
                component={CampaignDetailStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PinPointDetailStack"
                component={PinPointDetailStack}
            />
            <Stack.Screen
                name="CouponDetailStack"
                component={CouponDetailStack}
            />
        </Stack.Navigator>
    )
}

export default ModalNav;
