import React from 'react'
import { Avatar, Card, ListItem, Text } from 'react-native-elements';
import { SubTitle } from '../../atoms';
import { useAuthContext } from '../../useHook';

interface Props {

}

const Profile = (props: Props) => {

    const { auth: { userToken } } = useAuthContext();
    return (
        <Card containerStyle={{ width: '100%' }}>
            <ListItem>
                <ListItem.Content>
                    <Avatar
                        size={'large'}
                        title={userToken?.nickname}
                        source={{
                            uri: "https://i.imgur.com/fINuUV1.jpg"
                        }}
                    />
                </ListItem.Content>
                <ListItem.Content>
                    <SubTitle style={{ alignSelf: 'center' }}>10</SubTitle>
                    <Text style={{ alignSelf: 'center' }}>만든 캠페인</Text>
                </ListItem.Content>
                <ListItem.Content>
                    <SubTitle style={{ alignSelf: 'center' }}>1</SubTitle>
                    <Text style={{ alignSelf: 'center' }}>참여중 캠페인</Text>
                </ListItem.Content>
            </ListItem>

            <SubTitle>{userToken?.nickname}</SubTitle>
            <Text>자기소개</Text>
        </Card>
    )
}

export default Profile;