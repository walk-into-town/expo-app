import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import CampaignDetailStack from '../container/ModalNav/CampaignDetailStack';
import CouponDetailStack from '../container/ModalNav/CouponDetailStack';
import GamePlayStack from '../container/ModalNav/GamePlayStack';
import MyCouponStack from '../container/ModalNav/MyCouponStack';
import MyDetailStack from '../container/ModalNav/MyDetailStack';
import PinPointDetailStack from '../container/ModalNav/PinPointDetailStack';

interface Props {

}

const Stack = createStackNavigator();

const ModalNav = (props: Props) => {
    return (
        <Stack.Navigator screenOptions={{ headerTitleStyle: { fontFamily: "SCDream6" } }}>
            <Stack.Screen 
                name="MyDetailStack"
                component={MyDetailStack}
            />
            <Stack.Screen
                name="MyCouponStack"
                component={MyCouponStack}
                options={{ headerTitle: "내 쿠폰", headerBackTitleVisible: false }}
            />
            <Stack.Screen 
                name="GamePlayStack"
                component={GamePlayStack}
                options={{ headerTitle: "게임 플레이", headerBackTitleVisible: false }}
            />
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
