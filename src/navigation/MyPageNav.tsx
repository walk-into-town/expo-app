import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import MyPageStack from '../container/HomeTab/MyPageStack';

const Stack = createStackNavigator();
const MyPageNav = () => {

    return (
        <Stack.Navigator >
            <Stack.Screen name="MyPageStack" component={MyPageStack} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}

export default MyPageNav;