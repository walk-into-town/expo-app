import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { colorCode, HeaderLeftCloseIcon, HeaderLeftBackIcon } from '../atoms';
import CampaignViewStack from '../container/GamePlayNav/CampaignViewStack';

interface Props {

}

const Stack = createStackNavigator();

const GamePlayNav = (props: Props) => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleStyle: { fontSize: 15, color: colorCode.primary },
                headerBackTitleVisible: false,
                headerLeft: HeaderLeftBackIcon
            }}
        >
            <Stack.Screen
                name="CampaignViewStack"
                component={CampaignViewStack}
                options={{ headerTitle: "게임 플레이", headerLeft: HeaderLeftCloseIcon }}
            />


        </Stack.Navigator>
    )

}

export default GamePlayNav;
