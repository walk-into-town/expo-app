import { SearchCampaign } from '@types'
import React from 'react'
import { Text } from 'react-native'
import { Card } from 'react-native-elements'
import { color } from 'react-native-elements/dist/helpers'
import { ClearButton, colorCode, EvilIcons, Row, Text3, Title } from '../../atoms'
import { toCommonDate } from '../../util'

interface Props {
    campaign: SearchCampaign
    onParticipate: () => Promise<void>
}

const ProfileCard = ({ campaign, onParticipate }: Props) => {
    

    return (
        <Card containerStyle={{ marginBottom: 20, borderRadius: 5 }}>
            <Title>{campaign.name}</Title>
            <Row>
                <EvilIcons name="clock" size={20} />
                <Text3> {toCommonDate(campaign.updateTime)}</Text3>
            </Row>
            <Row>
                <EvilIcons name="user" size={20} />
                <Text3>{campaign.ownner}</Text3>
            </Row>
            <Row>
                <EvilIcons name="tag" size={20} />
                <Text3>{campaign.region}</Text3>
            </Row>
            <Text style={{ marginTop: 3, marginBottom: 20 }}>{campaign.description}</Text>

            <ClearButton title="탈퇴하기" onPress={() => onParticipate()} color={colorCode.light} />
        </Card>
    )
}

export default ProfileCard
