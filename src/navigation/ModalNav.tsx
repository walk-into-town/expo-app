import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { colorCode, HeaderLeftBackIcon } from '../atoms';
import ImageViewer from '../components/ImageViewer';
import CampaignDetailStack from '../container/ModalNav/CampaignDetailStack';
import CouponDetailStack from '../container/ModalNav/CouponDetailStack';
import MyCouponStack from '../container/ModalNav/MyCouponStack';
import MyDetailStack from '../container/ModalNav/MyDetailStack';
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
            <Stack.Screen
                name="ImageViewer"
                component={ImageViewer}
            />
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
