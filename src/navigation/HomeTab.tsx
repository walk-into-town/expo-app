import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CampaignStack from '../container/HomeTab/CampaignStack';
import GameStack from '../container/HomeTab/GameStack';
import RankingStack from '../container/HomeTab/RankingStack';
import MyPageStack from '../container/HomeTab/MyPageStack';
import { colorCode, Ionicons } from '../atoms';

const Tab = createBottomTabNavigator();

const HomeTab = () => {
    const iconName: { [key: string]: [string, string] } = {
        GameStack: ["ios-map-outline", "ios-map"],
        CampaignStack: ["ios-flashlight-outline", "ios-flashlight"],
        RankingStack: ["ios-trophy-outline", "ios-trophy"],
        MyPageStack: ["ios-person-outline", "ios-person"],
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
            }}
        >
            <Tab.Screen name="GameStack" component={GameStack} />
            <Tab.Screen name="CampaignStack" component={CampaignStack} />
            <Tab.Screen name="RankingStack" component={RankingStack} />
            <Tab.Screen name="MyPageStack" component={MyPageStack} />
        </Tab.Navigator>
    );
}

export default HomeTab;
