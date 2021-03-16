import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MyPage from '../components/MyPage';
import Campagin from '../components/Campagin';
import GamePlay from '../components/GamePlay';
import Ranking from '../components/Ranking';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const HomeTab = () => {
    const iconName: { [key: string]: [string, string] } = {
        MyPage: ["ios-home-outline", "ios-home"],
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
            <Tab.Screen name="MyPage" component={MyPage} />
            <Tab.Screen name="Campaign" component={Campagin} />
            <Tab.Screen name="GamePlay" component={GamePlay} options={{ tabBarBadge: 3 }} />
            <Tab.Screen name="Ranking" component={Ranking} />
        </Tab.Navigator>
    );
}

export default HomeTab;
