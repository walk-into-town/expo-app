import { PinPoint } from '@types'
import React from 'react'
import { View, Image, TouchableOpacity, Pressable } from 'react-native'
import { Card, Divider } from 'react-native-elements'
import { AbsoluteCousel, Carousel, colorCode, EvilIcons, FontAwesome, Ionicons, PaddingBox, SubTitle, Text3, Title } from '../../atoms'
import { mainNavigation } from '../../useHook'
import { toCommonDateTime } from '../../util'

interface Props {
    pinpoint: PinPoint
}

const PinPointInfo = ({ pinpoint }: Props) => {

    return (
        <View>
            {/* 핀포인트 프로필 */}
            <AbsoluteCousel images={["https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA1MTVfMTYg%2FMDAxNjIxMDEyMjA3NDA2.ItqcEYQylMRkiJ7t4-BfieTBnJ4XS9O8z2B0Zc04CVMg.VXRVIxHyZD4zTIqoIZRdEAuNnGvebv2LL0SbcuD_aAEg.JPEG.eunju_8783%2FIMG_5967.jpg&type=sc960_832", "https://i.ytimg.com/vi/IdMIqWnRpLg/maxresdefault.jpg"]}/>

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
                <Text3>{pinpoint.quiz.type}</Text3>
                <Text3>{pinpoint.quiz.text}</Text3>
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
