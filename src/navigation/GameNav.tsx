import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { colorCode, HeaderLeftBackIcon } from '../atoms';
import GamePlayStack from '../container/GameNav/GamePlayStack';
import QuizStack from '../container/GameNav/QuizStack';
import GameClear from '../container/GameNav/GameClear';

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
                name="GamePlayStack"
                component={GamePlayStack}
                options={{ headerTitle: "게임 플레이" }}
            />

            <Stack.Screen
                name="QuizStack"
                component={QuizStack}
                options={{ headerTitle: "퀴즈 플레이" }}
            />

            <Stack.Screen
                name="GameClear"
                component={GameClear}
                options={{ headerTitle: "" }}
            />

        </Stack.Navigator>
    )
}
export default GameNav;