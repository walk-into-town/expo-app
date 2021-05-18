import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { colorCode, HeaderLeftCloseIcon } from '../atoms';
import MyProfileEditStack from '../container/EditModalNav/MyProfileEditStack';
import WriteCampaignCommentStack from '../container/EditModalNav/WriteCampaignCommentStack';

const Stack = createStackNavigator();

const EditModalNav = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleStyle: { fontSize: 15, color: colorCode.primary },
                headerBackTitleVisible: false,
                headerLeft: HeaderLeftCloseIcon
            }}
        >
            <Stack.Screen
                name="MyProfileEditStack"
                component={MyProfileEditStack}
                options={{
                    headerTitle: "프로필 편집",
                }}
            />
            <Stack.Screen
                name="WriteCampaignCommentStack"
                component={WriteCampaignCommentStack}
                options={{
                    headerTitle: "프로필 편집",
                }}
            />
        </Stack.Navigator>
    )
}
export default EditModalNav;