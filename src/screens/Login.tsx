import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@types';

import LoginForm from '../components/login/LoginForm';

interface Props {
    navigation: StackNavigationProp<RootStackParamList, 'Login'>;
}

const Login = ({ navigation }: Props) => {
    const signIn = () => {
        navigation.navigate("HomeScreen");
    }
    
    return (
        <LoginForm signIn={signIn}/>
    )
}

export default Login;