import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import React from 'react'
import Campagin from '../components/Campagin';
import MyCampagin from '../components/Campagin/MyCampagin';
import MakeCampagin from '../components/Campagin/MakeCampagin';
import MakePinPoint from '../components/Campagin/MakePinPoint';
import MakeCoupon from '../components/Campagin/MakeCoupon';
import SearchCampagin from '../components/Campagin/SearchCampagin';


const Stack = createStackNavigator();
const CampaginStack = () => {

    return (
        <Stack.Navigator >
            <Stack.Screen name="Campagin" component={Campagin} options={{ headerShown: false }} />
            <Stack.Screen name="MyCampagin" component={MyCampagin} />

            <Stack.Screen name="MakeCampagin" component={MakeCampagin} options={{ headerTitle: "캠페인 만들기", headerBackTitle: "뒤로가기" }} />
            <Stack.Screen name="MakePinPoint" component={MakePinPoint} options={{ headerTitle: "핀포인트 만들기"}}/>
            <Stack.Screen name="MakeCoupon" component={MakeCoupon} options={{ headerTitle: "쿠폰 만들기"}}/>

            <Stack.Screen name="SearchCampagin" component={SearchCampagin} />
        </Stack.Navigator>
    )
}

export default CampaginStack;