import { Coupon } from '@types'
import React from 'react'
import { View } from 'react-native'
import { DefaultListItem, LoadingCircle, SubTitle } from '../../atoms'

interface Props {
    couponList: Coupon[],
    refreshing: boolean
    navToCouponDetail: (coupon: Coupon) => void
}

const CouponListTab = ({ couponList, refreshing, navToCouponDetail }: Props) => {
    if (refreshing)
        return <LoadingCircle size={50} />

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
