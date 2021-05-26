import { CampaginProfile, SearchCampaign } from '@types'
import React from 'react'
import { Text, View } from 'react-native'
import { Card } from 'react-native-elements'
import { color } from 'react-native-elements/dist/helpers'
import { AbsoluteCousel, ClearButton, colorCode, EvilIcons, Row, Text3, Title } from '../../atoms'
import { useAuthContext } from '../../useHook'
import { toCommonDate } from '../../util'

interface Props {
    campaignProfile: CampaginProfile
    isParticipate: boolean
    onParticipate: () => Promise<void>
    refreshing: boolean
}

const ProfileCard = ({ campaignProfile, isParticipate, onParticipate, refreshing }: Props) => {
    const { auth: { userToken } } = useAuthContext()
    if (userToken === undefined) return <></>

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
                images={campaignProfile.imgs}
            />
            <Card containerStyle={{ marginBottom: 20, borderRadius: 5 }}>
                <Title>{campaignProfile.name}</Title>
                <Row>
                    <EvilIcons name="clock" size={20} />
                    <Text3> {toCommonDate(campaignProfile.updateTime)}</Text3>
                </Row>
                <Row>
                    <EvilIcons name="user" size={20} />
                    <Text3>{campaignProfile.ownner}</Text3>
                </Row>
                <Row>
                    <EvilIcons name="tag" size={20} />
                    <Text3>{campaignProfile.region}</Text3>
                </Row>
                <Text style={{ marginTop: 3, marginBottom: 20 }}>{campaignProfile.description}</Text>

                {
                    refreshing ? <ClearButton title="로딩중" /> :
                    campaignProfile.ownner === userToken.id ?
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

export default ProfileCard
