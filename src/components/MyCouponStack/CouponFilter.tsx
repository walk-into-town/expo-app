import { MyCoupon, TuseState } from '@types'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { BadgeButton, BadgeButtonGroup, Row } from '../../atoms'

interface Props {
    couponList: MyCoupon[]
    useCouponFilterList: TuseState<MyCoupon[]>
}

const CouponFilter = (props: Props) => {
    const [couponFilterList, setCouponFilterList] = props.useCouponFilterList
    const [filterIdx, setFilterIdx] = useState(0)
    const [toggle, setToggle] = useState(true)

    useEffect(() => {
        onFilter();
    }, [props.couponList, toggle, filterIdx])

    const filteredArr = () => toggle ? props.couponList.filter(v => !v.used) : [...props.couponList]

    const onFilter = () => {
        if (filterIdx === 0)
            onTimeSort();
        else if (filterIdx === 1)
            onNameSort();
    }

    const onTimeSort = () => {
        setCouponFilterList(filteredArr().sort((a, b) =>
            a.endDate > b.endDate ? 1 : -1
        ));
    }

    const onNameSort = () => {
        setCouponFilterList(filteredArr().sort((a, b) =>
            a.name > b.name ? 1 : -1
        ));
    }


    return (
        <Row style={{ margin: 10, marginLeft: 20 }}>
            <View style={{ marginRight: 5 }}>
                <BadgeButton
                    title="사용가능한 쿠폰만 보기"
                    onPress={() => setToggle(!toggle)}
                    backgroundToggle={toggle}
                />
            </View>
            <BadgeButtonGroup
                buttons={[
                    { name: "유효기간순", func: () => { } },
                    { name: "이름순", func: () => { } },
                ]}
                useFilterIdx={[filterIdx, setFilterIdx]}
            />
        </Row>
    )
}

export default CouponFilter
