import { SearchCampaign } from '@types'
import React from 'react'
import { Text } from 'react-native'
import { Card } from 'react-native-elements'
import { ClearButton, EvilIcons, Row, Text3, Title } from '../../atoms'
import { toCommonDate } from '../../util'

interface Props {
    campagin: SearchCampaign
    onParticipate: () => Promise<void>
}

const ProfileCard = ({ campagin, onParticipate }: Props) => {


    return (
        <Card containerStyle={{ marginBottom: 20, borderRadius: 5 }}>
            <Title>{campagin.name}</Title>
            <Row>
                <EvilIcons name="clock" size={20} />
                <Text3> {toCommonDate(campagin.updateTime)}</Text3>
            </Row>
            <Row>
                <EvilIcons name="user" size={20} />
                <Text3>{campagin.ownner}</Text3>
            </Row>
            <Row>
                <EvilIcons name="tag" size={20} />
                <Text3>{campagin.region}</Text3>
            </Row>
            <Text style={{ marginTop: 3, marginBottom: 20 }}>{campagin.description}</Text>


            <ClearButton title="캠페인 참여하기" onPress={() => onParticipate()} />
        </Card>
    )
}

export default ProfileCard
