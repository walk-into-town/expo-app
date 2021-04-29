import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MakeCampagin from '../components/MakeCampagin/MakeCampagin';
import MakeCoupon from '../components/MakeCampagin/MakeCoupon';
import MakePinPoint from '../components/MakeCampagin/MakePinPoint';

const Stack = createStackNavigator();

const MakeCampaginStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerTitleStyle: { fontFamily: "SCDream6" }, headerBackTitleStyle: { fontFamily: "SCDream5" } }}>
            <Stack.Screen
                name="MakeCampagin"
                component={MakeCampagin}
                options={{ headerTitle: "캠페인 만들기", headerBackTitle: "취소" }} 
            />
            <Stack.Screen
                name="MakePinPoint"
                component={MakePinPoint}
                options={{ headerTitle: "핀포인트 만들기", headerBackTitleVisible: false }}
            />
            <Stack.Screen
                name="MakeCoupon"
                component={MakeCoupon}
                options={{ headerTitle: "쿠폰 만들기", headerBackTitleVisible: false }}
            />
        </Stack.Navigator>
    )
}
export default MakeCampaginStack;