import { RouteProp, useRoute } from '@react-navigation/core';
import { Coupon, ModalStackParamList, PinPoint } from '@types';
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { API } from '../../api';
import { ButtonTabs, Container, DefaultAlert, OutLineButton } from '../../atoms';
import CommentList from '../../components/CampaginDetailStack/CommentList';
import CouponListTab from '../../components/CampaginDetailStack/CouponListTab';
import PinPointListTab from '../../components/CampaginDetailStack/PinPointListTab';
import ProfileCard from '../../components/CampaginDetailStack/ProfileCard';

const CampaginDetailStack = () => {
    const { params: { campagin } } = useRoute<RouteProp<ModalStackParamList, 'CampaginDetailStack'>>();

    const [value, setValue] = useState(0);
    const [pinPointList, setPinPointList] = useState<PinPoint[]>([]);
    const [couponList, setCouponList] = useState<Coupon[]>([]);

    useEffect(() => {
        const getPinPoints = async () => {
            const { result, data, error, errdesc } = await API.pinPointRead({ type: 'list', id: campagin.id });
            if (result === "failed" || data === undefined)
                return DefaultAlert({ title: "핀포인트 가져오기 실패", subTitle: error })

            setPinPointList(data)
        }
        getPinPoints();
        const getCoupons = async () => {
            const { result, data, error, errdesc } = await API.couponRead({ type: 'list', id: campagin.id });
            if (result === "failed" || data === undefined)
                return DefaultAlert({ title: "쿠폰 가져오기 실패", subTitle: error })

            setCouponList(data)
        }
        getCoupons();
    }, [])

    return (
        <Container>
            <ScrollView>
                <ProfileCard campagin={campagin} />

                <ButtonTabs
                    selectedIndex={value}
                    onPress={setValue}
                    buttons={["핀포인트 리스트", "쿠폰 리스트"]}
                    viewList={[<PinPointListTab />, <CouponListTab />]}
                />

                <CommentList commentList={campagin.comments} />

            </ScrollView>
        </Container>
    )
}

export default CampaginDetailStack
