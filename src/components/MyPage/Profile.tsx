import React from 'react'
import { Avatar, Card, ListItem, Text } from 'react-native-elements';
import { useAuthContext } from '../../api/Auth';

interface Props {

}

const Profile = (props: Props) => {

    const { auth: { userToken } } = useAuthContext();
    return (
        <Card containerStyle={{ width: '50%' }}>
            <ListItem>
                <Avatar
                    title={userToken.name}
                    source={{
                        uri: "https://i.imgur.com/fINuUV1.jpg"
                    }}
                />
                <ListItem.Content>
                    <Text>{userToken.name}</Text>
                </ListItem.Content>
            </ListItem>
        </Card>
    )
}

export default Profile
