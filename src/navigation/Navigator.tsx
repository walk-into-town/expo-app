import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { View, Text } from 'react-native';
import { useAuthContext } from '../api/Auth';
import HomeTab from './HomeTab';
import LoginForm from '../components/Login/LoginForm';
import Game from '../components/GamePlay/Game';

const Stack = createStackNavigator();

export default () => {

    const { auth: { isLoading, userToken } } = useAuthContext();

    if (isLoading)
        return <View><Text>Loading...</Text></View>;

    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="float">
                {
                    userToken ?
                        <>
                            <Stack.Screen name="HomeTab" component={HomeTab} />
                            <Stack.Screen name="Game" component={Game} />
                        </>
                        :
                        <>
                            <Stack.Screen name="LoginForm" component={LoginForm} />
                        </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}
