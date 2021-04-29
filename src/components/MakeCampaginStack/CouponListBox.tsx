import { Coupon } from '@types'
import React from 'react'
import { Text } from 'react-native'
import { EvilIcons, OutLineButton } from '../../atoms'
import { Box, Row, SubTitle } from '../../atoms/styled'

interface Props {
    couponList: Coupon[],
    navToCouponModal: (item?: Coupon, idx?: number) => void,
    deleteCoupon: (idx: number) => void
}

const CouponListBox = ({ couponList, navToCouponModal, deleteCoupon }: Props) => {
    return (
        <Box>
            <SubTitle>쿠폰 리스트</SubTitle>
            {couponList.map((item, idx) =>
                <Row key={idx} style={{ height: 50 }}>
                    <Text
                        style={{ fontSize: 18, paddingHorizontal: 20 }}
                        onPress={() => navToCouponModal(item, idx)}>
                        {item.name}
                    </Text>
                    <Text>{item.endDate}</Text>
                    <EvilIcons
                        style={{ marginLeft: 'auto', marginRight: 16 }}
                        name="close"
                        onPress={() => deleteCoupon(idx)} size={20} />
                </Row>
            )}
            <OutLineButton
                title="쿠폰 추가"
                onPress={() => navToCouponModal()}
            />
        </Box>
    )
}

export default CouponListBox
