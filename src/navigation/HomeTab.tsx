import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import CampaginStack from '../container/HomeTab/CampaginStack';
import GameStack from '../container/HomeTab/GameStack';
import RankingStack from '../container/HomeTab/RankingStack';
import MyPageNav from './MyPageNav';
import { colorCode } from '../atoms/color';

const Tab = createBottomTabNavigator();

const HomeTab = () => {
    const iconName: { [key: string]: [string, string] } = {
        GameStack: ["ios-map-outline", "ios-map"],
        CampaginStack: ["ios-flashlight-outline", "ios-flashlight"],
        RankingStack: ["ios-trophy-outline", "ios-trophy"],
        MyPageNav: ["ios-person-outline", "ios-person"],
    }
    return (
        <Tab.Navigator
            screenOptions={({ route: { name } }) => ({
                tabBarIcon: ({ focused, color, size }) =>
                    <Ionicons name={iconName[name][focused ? 1 : 0]} size={size} color={color} />
            })}
            tabBarOptions={{
                activeTintColor: colorCode.primary,
                inactiveTintColor: "gray",
                showLabel: false
            }}>
            <Tab.Screen name="GameStack" component={GameStack} />
            <Tab.Screen name="CampaginStack" component={CampaginStack} />
            <Tab.Screen name="RankingStack" component={RankingStack} options={{ tabBarBadge: 3 }} />
            <Tab.Screen name="MyPageNav" component={MyPageNav} />
        </Tab.Navigator>
    );
}

export default HomeTab;
