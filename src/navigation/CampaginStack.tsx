import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import React from 'react'
import Campagin from '../components/Campagin';

const Stack = createStackNavigator();
const CampaginStack = () => {

    return (
        <Stack.Navigator screenOptions={{ headerTitleStyle: {fontFamily: "SCDream6"}, headerBackTitleStyle: {fontFamily: "SCDream5"} }}>
            <Stack.Screen name="Campagin" component={Campagin} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default CampaginStack;