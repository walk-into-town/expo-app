import React from 'react';
import { DefaultTheme, NavigationContainer, useNavigation } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator, StackHeaderLeftButtonProps } from '@react-navigation/stack';
import HomeTab from './HomeTab';
import MakeCampaginNav from './MakeCampaginNav';
import ModalNav from './ModalNav';
import LoginStack from '../container/LoginStack';
import theme from '../style/theme';
import { ThemeProvider } from 'styled-components';
import { useAuthContext } from '../useHook';
import { colorCode, EvilIcons } from '../atoms';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { mainNavigation } from './useNavigation';

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

    const AddIcon = () => {
        const mainNav = mainNavigation();
        return (
            <TouchableOpacity onPress={() => mainNav.navigate('MakeCampaginNav', { screen: "MakeCampaginStack", params: {} })}>
                <EvilIcons name="plus" size={25} style={{ color: colorCode.primary, marginRight: 5 }} />
            </TouchableOpacity>
        )
    }

    return (
        <NavigationContainer theme={MyTheme}>
            <ThemeProvider theme={theme}>
                <Stack.Navigator headerMode="float" screenOptions={{ headerShown: false }}>
                    {
                        userToken !== undefined ?
                            <>
                                <Stack.Screen name="HomeTab" component={HomeTab}
                                    options={{
                                        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
                                        headerShown: true,
                                        headerTitle: "걸어서 🌐 동네 속으로",
                                        headerTitleAlign: "left",
                                        headerTitleStyle: { fontFamily: "SCDream9", fontSize: 13, color: colorCode.primary },
                                        headerRight: AddIcon
                                    }}
                                />

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
