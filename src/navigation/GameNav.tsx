import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { colorCode, HeaderLeftBackIcon } from '../atoms';
import QuizStack from '../container/GameNav/QuizStack';
import GameClear from '../container/GameNav/GameClear';
import NyanCat from '../container/GameNav/NyanCat';

const Stack = createStackNavigator();

const GameNav = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleStyle: { fontSize: 15, color: colorCode.primary },
                headerBackTitleVisible: false,
                headerLeft: HeaderLeftBackIcon,
                headerStyle: { backgroundColor: "transparent" },
            }}
        >
            <Stack.Screen
                name="QuizStack"
                component={QuizStack}
                options={{ headerTitle: "퀴즈 플레이" }}
            />

            <Stack.Screen
                name="GameClear"
                component={GameClear}
                options={{ headerShown: false, gestureEnabled: false }}
            />

            <Stack.Screen
                name="NyanCat"
                component={NyanCat}
                options={{ headerTitle: "Nyan Cat" }}
            />
        </Stack.Navigator>
    )
}
export default GameNav;