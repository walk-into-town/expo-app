import React from 'react'
import { Avatar, Card, ListItem, Text } from 'react-native-elements';
import { useAuthContext } from '../../api/Auth';

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
                        title={userToken.name}
                        source={{
                            uri: "https://i.imgur.com/fINuUV1.jpg"
                        }}
                    />
                </ListItem.Content>
                <ListItem.Content>
                    <Text>10</Text>
                    <Text>만든 캠페인</Text>
                </ListItem.Content>
                <ListItem.Content>
                    <Text>1</Text>
                    <Text>참여중 캠페인</Text>
                </ListItem.Content>
            </ListItem>

            <Text>{userToken.name} 닉네임</Text>
            <Text>자기소개</Text>
        </Card>
    )
}

export default Profile;