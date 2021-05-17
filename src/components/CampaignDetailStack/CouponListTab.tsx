import { Coupon } from '@types'
import React from 'react'
import { View, Text } from 'react-native'
import { DefaultListItem, SubTitle, Title } from '../../atoms'

interface Props {
    couponList: Coupon[]
}

const CouponListTab = ({ couponList }: Props) => {
    if (couponList.length === 0)
        return <SubTitle style={{ marginTop: 20, marginBottom: 20, textAlign: "center" }}>텅</SubTitle>

    return (
        <View>
            {
                couponList.map((v, idx) => (
                    <DefaultListItem
                        key={idx}
                        title={v.name}
                        onPress={() => console.log(v.id)}
                    />
                ))
            }
        </View>
    )
}

export default CouponListTab
