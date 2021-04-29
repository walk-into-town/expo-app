import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useAuthContext } from '../util/Auth';
import HomeTab from './HomeTab';
import Game from '../components/GamePlay/Game';
import Login from '../components/Login';
import ModalStack from './ModalStack';
import theme from '../style/theme';
import { ThemeProvider } from 'styled-components';
import LoadingModal from '../components/LoadingModal';
import { useLoadingContext } from '../util/Loading';
import MakeCampaginStack from './MakeCampaginStack';

const Stack = createStackNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        // primary: 'rgb(255, 45, 85)',
    }
}

export default () => {
    const { auth: { userToken } } = useAuthContext();
    const { loading: { isLoading } } = useLoadingContext();

    return (
        <NavigationContainer theme={MyTheme}>
            <ThemeProvider theme={theme}>
                <Stack.Navigator headerMode="float" screenOptions={{ headerShown: false }}>
                    {
                        userToken !== undefined ?
                            <>
                                <Stack.Screen name="HomeTab" component={HomeTab} />
                                <Stack.Screen name="MakeCampaginStack" component={MakeCampaginStack}
                                    options={{ gestureEnabled: false, cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }} />
                                <Stack.Screen name="Game" component={Game} />
                                <Stack.Screen name="ModalStack" component={ModalStack} />
                            </>
                            :
                            <>
                                <Stack.Screen name="Login" component={Login} />
                            </>
                    }
                </Stack.Navigator>

            </ThemeProvider>
        </NavigationContainer>
    )
}
