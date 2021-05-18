import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'
import { ModalNavParamList } from '@types';
import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { Card, Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { PaddingBox, SubTitle, Text3, Title } from '../../atoms';
import Footer from '../../components/Footer';
import { toCommonDate } from '../../util';

interface Props {

}

const CouponDetailStack = (props: Props) => {
    const { params: { coupon, campaignName } } = useRoute<RouteProp<ModalNavParamList, "CouponDetailStack">>();

    const nav = useNavigation();
    useEffect(() => {
        nav.setOptions({ headerTitle: `${campaignName}의 쿠폰` })
    }, [campaignName])

    return (
        <ScrollView>
            <View style={{ height: 200 }}>
                <Image style={{ position: "absolute", width: "100%", height: 250 }} source={{ uri: "https://cdn.news.unn.net/news/photo/202008/233379_118713_4050.jpg" }} />
            </View>
            <Card containerStyle={{ borderRadius: 4 }}>
                <SubTitle style={{ textAlign: "center" }}>{coupon.name}</SubTitle>
                <Text3 style={{ textAlign: "center" }}>{coupon.description}</Text3>
            </Card>

            <PaddingBox>
                <SubTitle>쿠폰 상품</SubTitle>
                <Text3>{coupon.goods}</Text3>
            </PaddingBox>
            <Divider />

            <PaddingBox>
                <SubTitle>쿠폰 유효기간</SubTitle>
                <Text3>~ {toCommonDate(coupon.endDate)}</Text3>
            </PaddingBox>
            <Divider />

            <PaddingBox style={{alignItems: 'center'}}>
                <SubTitle>{coupon.issued} / {coupon.limit}</SubTitle>
                <Text3>지급된 쿠폰 / 총 지급 쿠폰</Text3>
            </PaddingBox>
            <Divider />

            <Footer />
        </ScrollView>
    )
}

export default CouponDetailStack
