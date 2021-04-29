import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import CampaginStack from '../container/HomeTab/CampaginStack';
import GameStack from '../container/HomeTab/GameStack';
import RankingStack from '../container/HomeTab/RankingStack';
import MyPageNav from './MyPageNav';

const Tab = createBottomTabNavigator();

const HomeTab = () => {
    const iconName: { [key: string]: [string, string] } = {
        MyPageNav: ["ios-home-outline", "ios-home"],
        CampaginStack: ["ios-flashlight-outline", "ios-flashlight"],
        GameStack: ["ios-map-outline", "ios-map"],
        RankingStack: ["ios-trophy-outline", "ios-trophy"]
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
            <Tab.Screen name="MyPageNav" component={MyPageNav} />
            <Tab.Screen name="CampaginStack" component={CampaginStack} />
            <Tab.Screen name="GameStack" component={GameStack} options={{ tabBarBadge: 3 }} />
            <Tab.Screen name="RankingStack" component={RankingStack} />
        </Tab.Navigator>
    );
}

export default HomeTab;
