import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Campaign from '../screens/Campaign';
import GamePlay from '../screens/GamePlay';
import Ranking from '../screens/Ranking';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const HomeScreen = () => {

    const iconName: { [key: string]: [string, string] } = {
        Home: ["ios-home-outline", "ios-home"],
        Campaign: ["ios-flashlight-outline", "ios-flashlight"],
        GamePlay: ["ios-game-controller-outline", "ios-game-controller"],
        Ranking: ["ios-trophy-outline", "ios-trophy"]
    }
    return (
        <Tab.Navigator
            screenOptions={({ route: { name } }) => ({
                tabBarIcon: ({ focused, color, size }) =>
                    <Ionicons name={iconName[name][focused ? 1 : 0]} size={size} color={color} />
            })}
            tabBarOptions={{
                activeTintColor: "#517fa4",
                inactiveTintColor: 'gray',
            }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Campaign" component={Campaign} />
            <Tab.Screen name="GamePlay" component={GamePlay} options={{ tabBarBadge: 3 }} />
            <Tab.Screen name="Ranking" component={Ranking} />
        </Tab.Navigator>
    );
}

export default () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}