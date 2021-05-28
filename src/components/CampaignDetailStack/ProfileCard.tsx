import { CampaginProfile, SearchCampaign } from '@types'
import React from 'react'
import { Text, View } from 'react-native'
import { Card } from 'react-native-elements'
import { AbsoluteCousel, ClearButton, colorCode, EvilIcons, Row, Text3, Title } from '../../atoms'
import { useAuthContext } from '../../useHook'
import { toCommonDate } from '../../util'

interface Props {
    campaignProfile: CampaginProfile
    isParticipate: boolean
    onParticipate: () => Promise<void>
    onWithDarw: () => void
    onEdit: () => void
    onDeleteCampaign: () => void
    refreshing: boolean
}

const ProfileCard = (props: Props) => {
    const { campaignProfile, isParticipate, refreshing } = props;
    const { auth: { userToken } } = useAuthContext()
    if (userToken === undefined) return <></>

    const ParticipateButton = () => (
        <ClearButton title="참여하기" onPress={props.onParticipate} color={colorCode.primary} />
    )
    const EditButton = () => (
        <Row style={{ alignSelf: "center" }}>
            <ClearButton title="수정하기" onPress={props.onEdit} color={colorCode.sub} />
            <ClearButton title="삭제하기" onPress={props.onDeleteCampaign} color={colorCode.light} />
        </Row>
    )
    const QuitButton = () => (
        <ClearButton title="탈퇴하기" onPress={props.onWithDarw} color={colorCode.light} />
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
                    refreshing ? <ClearButton title="로딩중" color={colorCode.light} /> :
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
