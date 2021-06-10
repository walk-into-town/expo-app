import { MyCoupon } from '@types'
import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import { API } from '../../api'
import { DefaultAlert, Text3, Title } from '../../atoms'
import Modal from "react-native-modal"
import CouponList from '../../components/MyCouponStack/CouponList'
import CouponModalCard from '../../components/MyCouponStack/CouponModalCard'
import CouponFilter from '../../components/MyCouponStack/CouponFilter'

const MyCouponStack = () => {

    const [couponList, setCouponList] = useState<MyCoupon[]>([])
    const [couponFilterList, setCouponFilterList] = useState<MyCoupon[]>([])
    const [refreshing, setRefreshing] = useState(false)
    const [modalVisble, setModalVisble] = useState(false)
    const [selectedCoupon, setSelectedCoupon] = useState<MyCoupon>()

    // api
    const getCoupons = async () => {
        const { result, data, error, errdesc } = await API.couponMy();
        if (result === "failed" || data === undefined)
            return DefaultAlert({ title: error, subTitle: errdesc })

        setCouponList(data)
    }
    const useCoupon = async (cid: string) => {
        const { result, data, error, errdesc } = await API.couponUse({ cid })
        if (result === "failed" || data === undefined) {
            return DefaultAlert({ title: error, subTitle: errdesc })
        }

        DefaultAlert({ title: "쿠폰을 사용했습니다", onPress: onRefresh })
    }


    // useCase
    const onRefresh = () => {
        const init = async () => {
            setModalVisble(false)
            setRefreshing(true);
            await getCoupons()
            setRefreshing(false)
        }
        init();
    }
    const openModal = (coupon: MyCoupon) => {
        setSelectedCoupon(coupon)
        setModalVisble(true);
    }
    useEffect(() => {
        onRefresh();
    }, [])

    return (
        <>
            <CouponFilter
                couponList={couponList}
                useCouponFilterList={[couponFilterList, setCouponFilterList]}
            />
            <ScrollView style={{ flex: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {
                    refreshing ?
                        <></>
                        : couponFilterList.length === 0 ?
                            <View style={{ marginTop: "40%", justifyContent: "center", alignItems: "center" }}>
                                <Title style={{ fontSize: 50 }}>텅</Title>
                                <Text3>쿠폰을 얻기 위해 모험을 떠나요!</Text3>
                            </View>
                            :
                            <CouponList
                                couponList={couponFilterList}
                                openModal={openModal}
                            />
                }
                <Modal isVisible={modalVisble} onBackdropPress={() => setModalVisble(false)}>
                    <CouponModalCard
                        coupon={selectedCoupon}
                        useCoupon={useCoupon}
                    />
                </Modal>
            </ScrollView>
        </>
    )
}

export default MyCouponStack;
