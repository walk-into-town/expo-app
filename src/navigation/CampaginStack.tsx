import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import Campagin from '../components/Campagin';
import MyCampagin from '../components/Campagin/MyCampagin';
import MakeCampagin from '../components/Campagin/MakeCampagin';
import MakePinPoint from '../components/Campagin/MakePinPoint';
import MakeCoupon from '../components/Campagin/MakeCoupon';
import SearchCampagin from '../components/Campagin/SearchCampagin';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { CampaginStackParamList } from '@types';
import theme from '../style/theme';
import { ThemeProvider } from 'styled-components';


const Stack = createStackNavigator();
const CampaginStack = () => {

    return (
        <ThemeProvider theme={theme}>
            <Stack.Navigator >
                <Stack.Screen name="Campagin" component={Campagin} />
                <Stack.Screen name="MyCampagin" component={MyCampagin} />

                <Stack.Screen name="MakeCampagin" component={MakeCampagin} />
                <Stack.Screen name="MakePinPoint" component={MakePinPoint} />
                <Stack.Screen name="MakeCoupon" component={MakeCoupon} />

                <Stack.Screen name="SearchCampagin" component={SearchCampagin} />
            </Stack.Navigator>
        </ThemeProvider>
    )
}

export default CampaginStack

const campgainNavigation = () => {
    return useNavigation<NavigationProp<CampaginStackParamList>>();
}
export { campgainNavigation }