import { Coupon } from '@types'
import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import { API } from '../../api'
import { DefaultAlert, Title } from '../../atoms'
import Modal from "react-native-modal"
import CouponList from '../../components/MyCouponStack/CouponList'
import CouponModalCard from '../../components/MyCouponStack/CouponModalCard'

const MyCoupon = () => {

    const [couponList, setCouponList] = useState<Coupon[]>([])
    const [refreshing, setRefreshing] = useState(false)
    const [modalVisble, setModalVisble] = useState(false)
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon>()

    // api
    const getCoupons = async () => {
        const { result, data, error, errdesc } = await API.couponMy();
        if (result === "failed" || data === undefined)
            return DefaultAlert({ title: error, subTitle: errdesc })

        setCouponList(data)
    }
    useEffect(() => {
        onRefresh()
    }, [])

    // useCase
    const onRefresh = async () => {
        setRefreshing(true);
        await getCoupons()
        setRefreshing(false)
    }
    const openModal = (coupon: Coupon) => {
        setSelectedCoupon(coupon)
        setModalVisble(true);
    }

    // render
    if (couponList.length === 0)
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Title>텅</Title>
            </View>
        )

    return (
        <ScrollView style={{ flex: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <CouponList
                couponList={couponList}
                openModal={openModal}
            />
            <Modal isVisible={modalVisble} onBackdropPress={() => setModalVisble(false)}>
                <CouponModalCard
                    coupon={selectedCoupon}
                />
            </Modal>
        </ScrollView>
    )
}

export default MyCoupon;
