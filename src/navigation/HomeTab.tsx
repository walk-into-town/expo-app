import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import GamePlay from '../components/GamePlay';
import Ranking from '../components/Ranking';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CampaginStack from './CampaginStack';
import MyPageStack from './MyPageStack';

const Tab = createBottomTabNavigator();

const HomeTab = () => {
    const iconName: { [key: string]: [string, string] } = {
        MyPageStack: ["ios-home-outline", "ios-home"],
        CampaginStack: ["ios-flashlight-outline", "ios-flashlight"],
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
            <Tab.Screen name="MyPageStack" component={MyPageStack} />
            <Tab.Screen name="CampaginStack" component={CampaginStack} />
            <Tab.Screen name="GamePlay" component={GamePlay} options={{ tabBarBadge: 3 }} />
            <Tab.Screen name="Ranking" component={Ranking} />
        </Tab.Navigator>
    );
}

export default HomeTab;
