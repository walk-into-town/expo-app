import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'
import { ModalNavParamList } from '@types';
import React, { useEffect } from 'react'
import { Card, Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { PaddingBox, SubTitle, Text3, Title, AbsoluteCousel } from '../../atoms';
import Footer from '../../components/Footer';
import { toCommonDate } from '../../util';

const CouponDetailStack = () => {
    const { params: { coupon, campaignName, pinpointList } } = useRoute<RouteProp<ModalNavParamList, "CouponDetailStack">>();

    const nav = useNavigation();
    useEffect(() => {
        nav.setOptions({ headerTitle: `${campaignName}의 쿠폰` })
    }, [campaignName])

    const renderCondition = (): string => {
        if (coupon.paymentCondition === -1) return `전체 핀포인트 클리어`
        return `[${pinpointList[coupon.paymentCondition]}] 핀포인트 클리어`
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {coupon.imgs !== "" && <AbsoluteCousel images={[coupon.imgs]} />}

            <Card containerStyle={{ borderRadius: 4, marginBottom: 4 }}>
                <Title>{coupon.name}</Title>
                <Text3 style={{ textAlign: "center", fontSize: 15 }}>{coupon.description}</Text3>
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

            <PaddingBox>
                <SubTitle>지급 조건</SubTitle>
                <Text3>{renderCondition()}</Text3>
            </PaddingBox>
            <Divider />

            <PaddingBox style={{ alignItems: 'center' }}>
                <SubTitle>{coupon.issued} / {coupon.limit}</SubTitle>
                <Text3>지급된 쿠폰 / 총 지급 쿠폰</Text3>
            </PaddingBox>
            <Divider />

            <Footer />
        </ScrollView >
    )
}

export default CouponDetailStack
