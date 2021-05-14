import { RouteProp, useRoute } from '@react-navigation/core';
import { CampaignComment, Coupon, ModalStackParamList, PinPoint } from '@types';
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { API } from '../../api';
import { ButtonTabs, Container, DefaultAlert } from '../../atoms';
import CommentList from '../../components/CampaignDetailStack/CommentList';
import CouponListTab from '../../components/CampaignDetailStack/CouponListTab';
import PinPointListTab from '../../components/CampaignDetailStack/PinPointListTab';
import ProfileCard from '../../components/CampaignDetailStack/ProfileCard';

const CampaignDetailStack = () => {
    const { params: { campagin } } = useRoute<RouteProp<ModalStackParamList, 'CampaignDetailStack'>>();

    const [value, setValue] = useState(0);
    const [pinPointList, setPinPointList] = useState<PinPoint[]>([]);
    const [couponList, setCouponList] = useState<Coupon[]>([]);

    useEffect(() => {
        const getPinPoints = async () => {
            const { result, data, error, errdesc } = await API.pinPointRead({ type: 'list', id: campagin.id });
            console.log(data)
            if (result === "failed" || data === undefined)
                return DefaultAlert({ title: "핀포인트 가져오기 실패", subTitle: error })

            setPinPointList(data)
        }
        getPinPoints();
        const getCoupons = async () => {
            const { result, data, error, errdesc } = await API.couponRead({ type: 'list', id: campagin.id });
            console.log(data)
            if (result === "failed" || data === undefined)
                return DefaultAlert({ title: "쿠폰 가져오기 실패", subTitle: error })

            setCouponList(data)
        }
        getCoupons();
    }, [])

    const tmpComment: CampaignComment = {
        id: "testtest",
        imgs: [],
        rated: 4,
        text: "아주 test한 캠페인입니다 ㅎㅎ",
        updateTime: new Date().toISOString(),
        userId: "testtest",
        nickname: "프로테스터",
        profileImg: ""
    }

    return (
        <Container>
            <ScrollView>
                <ProfileCard campagin={campagin} />

                <ButtonTabs
                    selectedIndex={value}
                    onPress={setValue}
                    buttons={["핀포인트 리스트", "쿠폰 리스트"]}
                    viewList={[
                        <PinPointListTab pinPointList={pinPointList} />,
                        <CouponListTab couponList={couponList} />
                    ]}
                />

                <CommentList
                    commentList={[...campagin.comments, tmpComment]}
                />

            </ScrollView>
        </Container>
    )
}

export default CampaignDetailStack
