import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import MakeCouponModal from '../components/Campagin/MakeCouponModal';
import MakePinPointModal from '../components/Campagin/MakePinPointModal';
import MakePinPointQuiz from '../components/Campagin/MakePinPointQuiz';

interface Props {

}

const Stack = createStackNavigator();

const ModalStack = (props: Props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MakePinPointModal" component={MakePinPointModal} />
            <Stack.Screen name="MakePinPointQuiz" component={MakePinPointQuiz} />

            <Stack.Screen name="MakeCouponModal" component={MakeCouponModal} />
        </Stack.Navigator>
    )
}

export default ModalStack
