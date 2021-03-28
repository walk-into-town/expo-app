import React from 'react'
import { View, Text } from 'react-native'
import { Card } from 'react-native-elements'

interface Props {

}

const BadgeList = (props: Props) => {
    return (
        <Card containerStyle={{width: "90%"}}>
            <Card.Title>⚜️ Badge list</Card.Title>
            <Card.Divider />
        </Card>
    )
}

export default BadgeList
