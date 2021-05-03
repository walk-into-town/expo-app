import { TuseState } from '@types'
import React from 'react'
import { OutLineButton, SubTitle } from '../../atoms'

interface Props {
    useGoods: TuseState<string[]>;
}

const AddCouponGoods = (props: Props) => {
    const [goods, setGoods] = props.useGoods;
    return (
        <>
            <SubTitle>쿠폰 상품</SubTitle>
            <OutLineButton title="쿠폰 상품 추가" />
        </>
    )
}

export default AddCouponGoods
