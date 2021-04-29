import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import MyCouponStack from '../container/ModalNav/MyCouponStack';

interface Props {

}

const Stack = createStackNavigator();

const ModalNav = (props: Props) => {
    return (
        <Stack.Navigator screenOptions={{ headerTitleStyle: { fontFamily: "SCDream6" } }}>
            <Stack.Screen
                name="MyCouponStack"
                component={MyCouponStack}
                options={{ headerTitle: "내 쿠폰", headerBackTitleVisible: false }}
            />
        </Stack.Navigator>
    )
}

export default ModalNav;
