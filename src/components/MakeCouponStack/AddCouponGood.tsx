import { TuseState } from '@types'
import React from 'react'
import { View, Text } from 'react-native'
import { OutLineButton } from '../../atoms'
import { SubTitle } from '../../atoms/styled'

interface Props {
    useGoods: TuseState<string[]>;
}

const AddCouponGood = (props: Props) => {
    const [goods, setGoods] = props.useGoods;
    return (
        <>
            <SubTitle>쿠폰 상품</SubTitle>
            <OutLineButton title="쿠폰 상품 추가" />
        </>
    )
}

export default AddCouponGood
