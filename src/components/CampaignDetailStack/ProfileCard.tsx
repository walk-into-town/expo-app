import { SearchCampaign } from '@types'
import React from 'react'
import { Text } from 'react-native'
import { Card } from 'react-native-elements'
import { ClearButton, Text3, Title } from '../../atoms'
import { toCommonDate } from '../../util'

interface Props {
    campagin: SearchCampaign
    onParticipate: () => Promise<void>
}

const ProfileCard = ({ campagin, onParticipate }: Props) => {


    return (
        <Card containerStyle={{ marginBottom: 20 }}>
            <Title>{campagin.name}</Title>
            <Text3>{toCommonDate(campagin.updateTime)} {campagin.ownner} {campagin.region}</Text3>
            <Text style={{ marginTop: 3, marginBottom: 20 }}>{campagin.description}</Text>

            <ClearButton title="캠페인 참여하기" onPress={() => onParticipate()} />
        </Card>
    )
}

export default ProfileCard
