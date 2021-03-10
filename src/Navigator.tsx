import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';

const { Navigator, Screen } = createStackNavigator();

export default () => {
    return (
        <NavigationContainer>
            <Navigator>
                <Screen name="Home" component={HomeScreen} />
            </Navigator>
        </NavigationContainer>
    )
}