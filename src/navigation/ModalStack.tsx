import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import MyCoupon from '../components/MyPage/MyCoupon';

interface Props {

}

const Stack = createStackNavigator();

const ModalStack = (props: Props) => {
    return (
        <Stack.Navigator screenOptions={{ headerTitleStyle: {fontFamily: "SCDream6"} }}>
            <Stack.Screen 
                name="MyCoupon"
                component={MyCoupon}
                options={{ headerTitle: "내 쿠폰", headerBackTitleVisible: false }}
            />
        </Stack.Navigator>
    )
}

export default ModalStack
