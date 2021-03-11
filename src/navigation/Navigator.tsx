import React, { createContext, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from '../screens/Login';
import Home from '../screens/Home';
import Campaign from '../screens/Campaign';
import GamePlay from '../screens/GamePlay';
import Ranking from '../screens/Ranking';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text } from 'react-native';
import { getStorage, rmStorage, setStorage } from '../api/AsyncStorage';
import { Iauth } from '@types';
import { AuthContext } from '../api/Auth';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreen = () => {
    const iconName: { [key: string]: [string, string] } = {
        Home: ["ios-home-outline", "ios-home"],
        Campaign: ["ios-flashlight-outline", "ios-flashlight"],
        GamePlay: ["ios-map-outline", "ios-map"],
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
    const [state, dispatch] = React.useReducer(
        (prevState: any, action: { type: string; token: any; }) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        isLoading: false,
                        userToken: action.token,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    React.useEffect(() => {
        const bootAsync = async () => {
            const userToken = await getStorage("userToken")
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootAsync();
    }, []);

    const auth:Iauth = React.useMemo(() => ({
        signIn: async (data) => {
            // await setStorage("userToken", data);
            dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
        },
        signOut: async () => {
            await rmStorage("userToken");
            dispatch({ type: 'SIGN_OUT', token: "null" })
        },
        signUp: async (data) => {

            dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
        },
    }), []);

    if (state.isLoading)
        return <View><Text>Loading...</Text></View>;

    return (
        <AuthContext.Provider value={auth}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    {
                        state.userToken ?
                            <Stack.Screen name="HomeScreen" component={HomeScreen} />
                            :
                            <>
                                <Stack.Screen name="Login" component={Login} />
                            </>
                    }
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    )
}