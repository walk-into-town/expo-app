import { RouteProp, useRoute } from '@react-navigation/core';
import { CampaignComment, Coupon, ModalStackParamList, PinPoint } from '@types';
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { API } from '../../api';
import { ButtonTabs, Container, DefaultAlert, SelectionAlert } from '../../atoms';
import CommentList from '../../components/CampaignDetailStack/CommentList';
import CouponListTab from '../../components/CampaignDetailStack/CouponListTab';
import PinPointListTab from '../../components/CampaignDetailStack/PinPointListTab';
import ProfileCard from '../../components/CampaignDetailStack/ProfileCard';
import { useAuthContext, useLoadingContext } from '../../useHook';

const CampaignDetailStack = () => {
    const { useLoading: { startLoading, endLoading } } = useLoadingContext()
    const { auth: { userToken } } = useAuthContext()
    if (userToken === undefined) return;

    const { params: { campagin } } = useRoute<RouteProp<ModalStackParamList, 'CampaignDetailStack'>>();

    const [value, setValue] = useState(0);
    const [pinPointList, setPinPointList] = useState<PinPoint[]>([]);
    const [couponList, setCouponList] = useState<Coupon[]>([]);

    useEffect(() => {
        const getPinPoints = async () => {
            const { result, data, error, errdesc } = await API.pinPointRead({ type: 'list', id: campagin.id });
            if (result === "failed" || data === undefined)
                return DefaultAlert({ title: "핀포인트 가져오기 실패", subTitle: `${error} ${errdesc}` })

            setPinPointList(data)
        }
        getPinPoints();
        const getCoupons = async () => {
            const { result, data, error, errdesc } = await API.couponRead({ type: 'list', id: campagin.id });
            if (result === "failed" || data === undefined)
                return DefaultAlert({ title: "쿠폰 가져오기 실패", subTitle: `${error} ${errdesc}` })

            setCouponList(data)
        }
        getCoupons();
    }, [])

    const onParticipate = async () => {
        startLoading();
        const { result, data, error, errdesc } = await API.campaginParticiapte({ cid: campagin.id, uid: userToken.id })
        endLoading();
        if (result === "failed" || data === undefined)
            return DefaultAlert({ title: "캠페인 참여 실패", subTitle: `${error} ${errdesc}` })

        SelectionAlert({
            title: "캠페인에 참여하게 되었습니다!", buttons: [
                { text: "나의 캠페인 정보를 확인하기" }
            ]
        })
    }

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
                <ProfileCard
                    campagin={campagin}
                    onParticipate={onParticipate}
                />

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
