import { MakeCoupon } from '@types'
import React from 'react'
import { Box, SubTitle, OutLineButton, SimpleSwapListItem, DefaultAlert } from '../../atoms'

interface Props {
    couponList: MakeCoupon[],
    isEdit: boolean
    navToCouponModal: (item?: MakeCoupon, idx?: number) => void,
    deleteCoupon: (idx: number) => void
}

const CouponListBox = ({ couponList, isEdit, navToCouponModal, deleteCoupon }: Props) => {
    return (
        <Box>
            <SubTitle style={{ marginTop: 10 }}>쿠폰 리스트</SubTitle>
            {couponList.map((item, idx) =>
                <SimpleSwapListItem
                    key={idx}
                    text={item.name}
                    onText={() => navToCouponModal(item, idx)}
                    onDelete={() => isEdit ? DefaultAlert({ title: "첨삭이 불가합니다" }) : deleteCoupon(idx)}
                />
            )}
            <OutLineButton
                title="쿠폰 추가"
                onPress={() => navToCouponModal()}
                style={{ marginTop: 10 }}
                disabled={isEdit}
            />
        </Box>
    )
}

export default CouponListBox
