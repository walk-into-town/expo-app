import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import Campagin from '../components/Campagin';
import MakeCampagin from '../components/Campagin/MakeCampagin';
import MyCampagin from '../components/Campagin/MyCampagin';
import SearchCampagin from '../components/Campagin/SearchCampagin';


const Stack = createStackNavigator();
const CampaginStack = () => {

    return (
        <Stack.Navigator >
            <Stack.Screen name="Campagin" component={Campagin} />
            <Stack.Screen name="MyCampagin" component={MyCampagin} />
            <Stack.Screen name="MakeCampagin" component={MakeCampagin} />
            <Stack.Screen name="SearchCampagin" component={SearchCampagin} />
        </Stack.Navigator>
    )
}

export default CampaginStack
