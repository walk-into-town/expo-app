import { SearchCampagin } from '@types'
import React from 'react'
import { Text } from 'react-native'
import { Card } from 'react-native-elements'
import { OutLineButton, Title } from '../../atoms'

interface Props {
    campagin: SearchCampagin
}

const ProfileCard = ({ campagin }: Props) => {
    return (
        <Card containerStyle={{ marginBottom: 20 }}>
            <Title>{campagin.name}</Title>
            <Text>{campagin.description}</Text>
            <Text>{campagin.updateTime}</Text>
            <Text>{campagin.region}</Text>

            <OutLineButton title="캠페인 참여하기" style={{ marginTop: 10 }} />
        </Card>
    )
}

export default ProfileCard
