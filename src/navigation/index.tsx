import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { mainNavigation, useAuthContext } from '../useHook';

import theme from '../style/theme';
import { ThemeProvider } from 'styled-components';
import HomeTab from './HomeTab';
import MakeCampaignNav from './MakeCampaignNav';
import ModalNav from './ModalNav';
import GameNav from './GameNav';
import LoginStack from '../container/LoginStack';
import { colorCode, EvilIcons } from '../atoms';
import { TouchableOpacity } from 'react-native-gesture-handler';
import EditModalNav from './EditModalNav';

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
            <TouchableOpacity onPress={() => mainNav.navigate('MakeCampaignNav', { screen: "MakeCampaignStack", params: {} })}>
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
                                <Stack.Screen
                                    name="HomeTab"
                                    component={HomeTab}
                                    options={{
                                        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
                                        headerShown: true,
                                        headerTitle: "걸어서 🌐 동네 속으로",
                                        headerTitleAlign: "left",
                                        headerTitleStyle: { fontFamily: "SCDream9", fontSize: 13, color: colorCode.primary },
                                        headerRight: AddIcon
                                    }}
                                />

                                <Stack.Screen
                                    name="MakeCampaignNav"
                                    component={MakeCampaignNav}
                                    options={{ gestureEnabled: false, cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}
                                />
                                <Stack.Screen
                                    name="GameNav"
                                    component={GameNav}
                                    options={{ gestureEnabled: false, cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid }}
                                />
                                <Stack.Screen
                                    name="ModalNav"
                                    component={ModalNav}
                                />
                                <Stack.Screen
                                    name="EditModalNav"
                                    component={EditModalNav}
                                    options={{ gestureEnabled: false, cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}
                                />
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
