import { MyCoupon } from '@types'
import React from 'react'
import { Image, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { colorCode, ConfirmAlert, SubmitButton, SubTitle, Text1, Text3, Title, WhiteView } from '../../atoms'
import { imgPath, toCommonDate } from '../../util'

interface Props {
    coupon?: MyCoupon
    useCoupon: (cid: string) => void
}

const CouponModalCard = (props: Props) => {
    const { coupon } = props;
    if (!coupon)
        return <Title>error</Title>

    const onUse = (cid?: string) => {
        if (cid)
            ConfirmAlert({
                title: "쿠폰을 사용하시겠습니까?",
                subTitle: "사용 후에는 쿠폰이 사용처리되어 더이상 쓸 수 없습니다.",
                onConfirm: () => props.useCoupon(cid)
            })
    }


    return (
        <WhiteView style={{ borderRadius: 4, height: "80%" }}>
            <Image source={coupon.imgs === "" ? imgPath.default : { uri: coupon.imgs }} style={{ width: "100%", height: 200, alignSelf: "center" }} defaultSource={imgPath.default} />
            <View style={{ borderWidth: 1, borderColor: colorCode.primary }} />

            <ScrollView style={{ padding: 20 }} showsVerticalScrollIndicator={false}>

                <View style={{ alignItems: "center" }}>
                    <SubTitle>{coupon.name}</SubTitle>
                    <SubTitle>{coupon.goods}</SubTitle>
                    <Text3 style={{ color: colorCode.sub }}>
                        사용만료일 {toCommonDate(coupon.endDate)}
                    </Text3>
                </View>
                <SubmitButton title="쿠폰사용" onPress={() => onUse(coupon.id)} option={{ disabled: coupon.used }} />

                <Text3 style={{ marginVertical: 4 }}>- {coupon.description}</Text3>
                <Text1 style={{ marginVertical: 4 }}>- 1인 1회 쿠폰 사용 가능합니다.</Text1>
                <Text1 style={{ marginVertical: 4 }}>- {toCommonDate(coupon.endDate)} 까지 사용 가능합니다.</Text1>
                <Text1 style={{ marginVertical: 4 }}>- 설명에 따라 오프라인으로 쿠폰을 사용하세요.</Text1>
            </ScrollView>
        </WhiteView>
    )
}

export default CouponModalCard
