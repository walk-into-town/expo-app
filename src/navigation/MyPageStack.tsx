import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import React from 'react'
import MyPage from '../components/MyPage';
import MyCoupon from '../components/MyPage/MyCoupon';

const Stack = createStackNavigator();
const MyPageStack = () => {

    return (
        <Stack.Navigator >
            <Stack.Screen name="MyPage" component={MyPage} options={{ headerShown: false }}/>
            <Stack.Screen 
                name="MyCoupon" 
                component={MyCoupon} 
                options={{ headerTitle: "내 쿠폰", headerBackTitleVisible: false}} />
        </Stack.Navigator>
    )
}

export default MyPageStack;