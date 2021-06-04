import { Coupon } from '@types'
import React from 'react'
import { ListItem } from 'react-native-elements'
import { Row, SubTitle, Text3 } from '../../atoms'
import { toCommonDate } from '../../util'

interface Props {
    couponList: Coupon[]
    openModal: (coupon: Coupon) => void
}

const CouponList = (props: Props) => {
    return (
        <>
            {
                props.couponList.map((v, idx) => (
                    <ListItem
                        disabled={false}
                        key={idx}
                        bottomDivider style={{ marginHorizontal: 30, marginVertical: 4, borderRadius: 10 }}
                        containerStyle={{ borderRadius: 10 }}
                        disabledStyle={{ opacity: .5 }}
                        onPress={() => props.openModal(v)}
                    >
                        <ListItem.Content>
                            <Row>
                                <SubTitle>{v.name}</SubTitle>
                                <Text3 style={{ marginLeft: 10 }}>~{toCommonDate(v.endDate)}</Text3>
                            </Row>
                            <Text3>{v.goods}</Text3>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </>
    )
}

export default CouponList
