import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { colorCode, HeaderLeftCloseIcon, HeaderRightCheckIcon } from '../atoms';
import MyProfileEditStack from '../container/EditModalNav/MyProfileEditStack';
import WriteCampaignCommentStack from '../container/EditModalNav/WriteCampaignCommentStack';
import WritePinPointCommentStack from '../container/EditModalNav/WritePinPointCommentStack';
import ReportCommentStack from '../container/EditModalNav/ReportCommentStack';

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
            {/* 리뷰, 평가 */}
            <Stack.Screen
                name="WriteCampaignCommentStack"
                component={WriteCampaignCommentStack}
            />
            <Stack.Screen
                name="WritePinPointCommentStack"
                component={WritePinPointCommentStack}
            />
            <Stack.Screen
                name="ReportCommentStack"
                component={ReportCommentStack}
            />
        </Stack.Navigator>
    )
}
export default EditModalNav;