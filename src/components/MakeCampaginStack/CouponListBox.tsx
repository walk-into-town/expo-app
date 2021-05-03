import { Coupon, MakeCoupon } from '@types'
import React from 'react'
import { Text } from 'react-native'
import { Box, Row, SubTitle, EvilIcons, OutLineButton, SimpleSwapListItem } from '../../atoms'

interface Props {
    couponList: MakeCoupon[],
    navToCouponModal: (item?: MakeCoupon, idx?: number) => void,
    deleteCoupon: (idx: number) => void
}

const CouponListBox = ({ couponList, navToCouponModal, deleteCoupon }: Props) => {
    return (
        <Box>
            <SubTitle>쿠폰 리스트</SubTitle>
            {couponList.map((item, idx) =>
                <SimpleSwapListItem
                    key={idx}
                    text={item.name}
                    onText={() => navToCouponModal(item, idx)}
                    onDelete={() => deleteCoupon(idx)}
                />
            )}
            <OutLineButton
                title="쿠폰 추가"
                onPress={() => navToCouponModal()}
                style={{marginTop: 5}}
            />
        </Box>
    )
}

export default CouponListBox
