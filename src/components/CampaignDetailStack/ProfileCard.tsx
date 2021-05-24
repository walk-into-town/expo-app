import { SearchCampaign } from '@types'
import React from 'react'
import { Text } from 'react-native'
import { Card } from 'react-native-elements'
import { color } from 'react-native-elements/dist/helpers'
import { ClearButton, colorCode, EvilIcons, Row, Text3, Title } from '../../atoms'
import { useAuthContext } from '../../useHook'
import { toCommonDate } from '../../util'

interface Props {
    campaign: SearchCampaign
    isParticipate: boolean
    onParticipate: () => Promise<void>
}

const ProfileCard = ({ campaign, isParticipate, onParticipate }: Props) => {
    const { auth: { userToken } } = useAuthContext()
    if (userToken === undefined) return <>userToken error</>

    const ParticipateButton = () => (
        <ClearButton title="참여하기" onPress={onParticipate} color={colorCode.primary} />
    )
    const EditButton = () => (
        <ClearButton title="수정하기" onPress={() => { }} color={colorCode.sub} />
    )
    const QuitButton = () => (
        <ClearButton title="탈퇴하기" onPress={() => { }} color={colorCode.light} />
    )

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

            {
                campaign.ownner === userToken.id ?
                    <EditButton />
                    : isParticipate ?
                        <QuitButton />
                        :
                        <ParticipateButton />
            }
        </Card>
    )
}

const ActionButton = () => {

}

export default ProfileCard
