import React from 'react'
import { View, Text } from 'react-native'
import { Card } from 'react-native-elements'

interface Props {

}

const BadgeList = (props: Props) => {
    return (
        <Card containerStyle={{width: "100%"}}>
            <Card.Title>⚜️ 명예 컬렉션 ⚜️</Card.Title>
            <Card.Divider />
        </Card>
    )
}

export default BadgeList
