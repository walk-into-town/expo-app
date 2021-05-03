import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import HomeTab from './HomeTab';
import MakeCampaginNav from './MakeCampaginNav';
import ModalNav from './ModalNav';
import LoginStack from '../container/LoginStack';
import theme from '../style/theme';
import { ThemeProvider } from 'styled-components';
import { useAuthContext } from '../useHook';

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

    return (
        <NavigationContainer theme={MyTheme}>
            <ThemeProvider theme={theme}>
                <Stack.Navigator headerMode="float" screenOptions={{ headerShown: false }}>
                    {
                        userToken !== undefined ?
                            <>
                                <Stack.Screen name="HomeTab" component={HomeTab} />
                                <Stack.Screen name="MakeCampaginNav" component={MakeCampaginNav}
                                    options={{ gestureEnabled: false, cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }} />
                                <Stack.Screen name="ModalNav" component={ModalNav} />
                            </>
                            :
                            <>
                                <Stack.Screen name="LoginStack" component={LoginStack} />
                            </>
                    }
                </Stack.Navigator>

            </ThemeProvider>
        </NavigationContainer>
    )
}
