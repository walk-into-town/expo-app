import React from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { View, Text } from 'react-native';
import { useAuthContext } from '../api/Auth';
import HomeTab from './HomeTab';
import Game from '../components/GamePlay/Game';
import Login from '../components/Login';
import ModalStack from './ModalStack';

const Stack = createStackNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'rgb(255, 45, 85)',

    }
}

export default () => {
    const { auth: { isLoading, userToken, isSignout } } = useAuthContext();

    if (isLoading)
        return <View><Text>Loading...</Text></View>;

    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator headerMode="float" screenOptions={{ headerShown: false }}>
                {
                    userToken ?
                        <>
                            <Stack.Screen name="HomeTab" component={HomeTab} />
                            <Stack.Screen name="Game" component={Game} />
                            <Stack.Screen name="ModalStack" component={ModalStack} />
                        </>
                        :
                        <>
                            <Stack.Screen name="Login" component={Login} />
                        </>
                }
            </Stack.Navigator>
        </NavigationContainer >
    )
}
