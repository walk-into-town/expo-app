import { PinPoint } from '@types'
import React from 'react'
import { View } from 'react-native'
import { Card, Divider } from 'react-native-elements'
import { AbsoluteCousel, PaddingBox, Row, SubTitle, Text3, Title } from '../../atoms'
import { toCommonDateTime } from '../../util'

interface Props {
    pinpoint: PinPoint
}

const PinPointInfo = ({ pinpoint }: Props) => {
    return (
        <View>
            {/* 핀포인트 프로필 */}
            <AbsoluteCousel images={pinpoint.imgs} />

            <Card containerStyle={{ borderRadius: 4, marginBottom: 20 }}>
                <Title>{pinpoint.name}</Title>
                <Text3 style={{ textAlign: "center" }}>{pinpoint.description}</Text3>
            </Card>

            {/* 상세 정보 */}
            <PaddingBox>
                <SubTitle>위치</SubTitle>
                <Text3>{pinpoint.longitude} {pinpoint.latitude}</Text3>
            </PaddingBox>
            <Divider />

            <PaddingBox>
                <SubTitle>퀴즈 정보</SubTitle>
                <Row>
                    <Text3>{pinpoint.quiz.type}</Text3>
                    <Text3 style={{ marginLeft: 10 }}>{pinpoint.quiz.text}</Text3>
                </Row>
            </PaddingBox>
            <Divider />

            <PaddingBox>
                <SubTitle>지급 쿠폰</SubTitle>
                {
                    !pinpoint.coupons || !pinpoint.coupons.length ? <Text3>해당 핀포인트에서 지급되는 쿠폰이 없습니다</Text3>
                        : pinpoint.coupons.map((v, idx) => <Text3 key={idx}>{v}</Text3>)
                }
            </PaddingBox>
            <Divider />

            <PaddingBox>
                <SubTitle>수정 시간</SubTitle>
                <Text3>{toCommonDateTime(pinpoint.updateTime)}</Text3>
            </PaddingBox>
            <Divider />
        </View>
    )
}

export default PinPointInfo
