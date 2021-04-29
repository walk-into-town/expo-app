import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import MyPage from '../components/MyPage';

const Stack = createStackNavigator();
const MyPageStack = () => {

    return (
        <Stack.Navigator >
            <Stack.Screen name="MyPage" component={MyPage} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}

export default MyPageStack;