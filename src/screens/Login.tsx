import React from 'react'
import { View, Button } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@types';

interface Props {
    navigation: StackNavigationProp<RootStackParamList, 'Login'>;
}

const Login = ({ navigation }: Props) => {

    return (
        <View>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('HomeScreen')} />
        </View>
    )
}

export default Login;