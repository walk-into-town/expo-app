import { SearchCampaign } from '@types'
import React from 'react'
import { Text, View } from 'react-native'
import { Card } from 'react-native-elements'
import { color } from 'react-native-elements/dist/helpers'
import { AbsoluteCousel, ClearButton, colorCode, EvilIcons, Row, Text3, Title } from '../../atoms'
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
        <View>
            <AbsoluteCousel
                images={["https://cdn.news.unn.net/news/photo/202008/233379_118713_4050.jpg"]}
            />
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
        </View>
    )
}

const ActionButton = () => {

}

export default ProfileCard
