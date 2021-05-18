import { Coupon } from '@types'
import React from 'react'
import { View, Text } from 'react-native'
import { DefaultListItem, SubTitle, Title } from '../../atoms'
import { modalNavigation } from '../../navigation/useNavigation'

interface Props {
    couponList: Coupon[],
    navToCouponDetail: (coupon: Coupon) => void
}

const CouponListTab = ({ couponList, navToCouponDetail }: Props) => {
    if (couponList.length === 0)
        return <SubTitle style={{ marginTop: 20, marginBottom: 20, textAlign: "center" }}>텅</SubTitle>

    return (
        <View>
            {
                couponList.map((v, idx) => (
                    <DefaultListItem
                        key={idx}
                        title={v.name}
                        onPress={() => navToCouponDetail(v)}
                    />
                ))
            }
        </View>
    )
}

export default CouponListTab
