import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import MakeCouponModal from '../components/Campagin/MakeCouponModal';
import MakePinPointModal from '../components/Campagin/MakePinPointModal';
import MyCoupon from '../components/MyPage/MyCoupon';

interface Props {

}

const Stack = createStackNavigator();

const ModalStack = (props: Props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="MakePinPointModal" 
                component={MakePinPointModal} 
                options={{ headerTitle: "핀포인트 만들기", headerBackTitleVisible: false }}
            />
            <Stack.Screen 
                name="MakeCouponModal" 
                component={MakeCouponModal} 
                options={{ headerTitle: "쿠폰 만들기", headerBackTitleVisible: false }}
            />
            <Stack.Screen 
                name="MyCoupon"
                component={MyCoupon}
                options={{ headerTitle: "내 쿠폰", headerBackTitleVisible: false }}
            />
        </Stack.Navigator>
    )
}

export default ModalStack
