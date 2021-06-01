import React from 'react'
import { Card, Divider, ListItem, Text } from 'react-native-elements'
import { colorCode, SubTitle, WhiteView } from '../../atoms'
import { useAuthContext } from '../../useHook'

interface Props {

}

const BadgeList = (props: Props) => {
    const { auth: { userToken } } = useAuthContext();
    if (userToken === undefined) return <></>

    return (
        <WhiteView style={{ marginVertical: 10 }}>
            <ListItem>
                <ListItem.Content style={{ alignItems: "center" }}>
                    <SubTitle><Text style={{ color: colorCode.primary }}>{userToken.id}</Text> 님의 컬렉션</SubTitle>
                </ListItem.Content>
            </ListItem>

            <Divider />

            <ListItem>

            </ListItem>
        </WhiteView>
    )
}

export default BadgeList
