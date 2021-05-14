import React from 'react'
import { Card, Divider, ListItem, Text } from 'react-native-elements'
import { SubTitle, WhiteView } from '../../atoms'

interface Props {

}

const BadgeList = (props: Props) => {
    return (
        <WhiteView style={{ marginVertical: 10 }}>
            <ListItem>
                <ListItem.Content style={{alignItems: "center"}}>
                    <Text style={{ fontFamily: "SCDream7" }}>⚜️ 명예 컬렉션 ⚜️</Text>
                </ListItem.Content>
            </ListItem>

            <Divider />

            <ListItem>

            </ListItem>
        </WhiteView>
    )
}

export default BadgeList
