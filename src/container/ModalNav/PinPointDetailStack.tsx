import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'
import { ModalNavParamList } from '@types'
import React, { useEffect } from 'react'
import { View, Image } from 'react-native'
import { Card, Divider, ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { BadgeButton, PaddingBox, Row, SubTitle, Text3, Title } from '../../atoms'
import Footer from '../../components/Footer'
import { mainNavigation } from '../../useHook'
import { toCommonDateTime } from '../../util'

interface Props {

}

const PinPointDetailStack = (props: Props) => {
    const { params: { pinpoint, campaignName } } = useRoute<RouteProp<ModalNavParamList, "PinPointDetailStack">>();

    const mainNav = mainNavigation();
    const nav = useNavigation();
    useEffect(() => {
        nav.setOptions({ headerTitle: `${campaignName}의 핀포인트` })
    }, [campaignName])
    const navToWriteComment = () => {
        mainNav.navigate("EditModalNav", { screen: "WritePinPointCommentStack", params: { pid: pinpoint.id, pname: pinpoint.name } })
    }


    return (
        <ScrollView>
            <View style={{ height: 200 }}>
                <Image style={{ position: "absolute", width: "100%", height: 250 }} source={{ uri: "https://cdn.news.unn.net/news/photo/202008/233379_118713_4050.jpg" }} />
            </View>
            <Card containerStyle={{ borderRadius: 4, marginBottom: 20 }}>
                <Title>{pinpoint.name}</Title>
                <Text3 style={{ textAlign: "center" }}>{pinpoint.description}</Text3>
            </Card>

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
                <Text3>{pinpoint.coupons}</Text3>
            </PaddingBox>
            <Divider />

            <PaddingBox>
                <SubTitle>수정 시간</SubTitle>
                <Text3>{toCommonDateTime(pinpoint.updateTime)}</Text3>
            </PaddingBox>
            <Divider />

            <PaddingBox style={{ minHeight: 200 }}>
                <Row>
                    <SubTitle>댓글 {pinpoint.comments?.length}</SubTitle>
                    <View style={{ marginLeft: 'auto' }}>
                        <BadgeButton title="댓글 달기" onPress={navToWriteComment} />
                    </View>
                </Row>
                {
                    pinpoint.comments?.map((v, idx) => {
                        <ListItem key={idx}>
                            <Text3>{v.userId}</Text3>
                            <Text3>{v.text}</Text3>
                        </ListItem>
                    })
                }
            </PaddingBox>

            <Footer />
        </ScrollView>
    )
}

export default PinPointDetailStack
