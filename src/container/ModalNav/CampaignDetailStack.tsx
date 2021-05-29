import { RouteProp, useIsFocused, useRoute } from '@react-navigation/core';
import { CampaginProfile, CampaignComment, Coupon, MakeCampaign, MakeCampaignComment, ModalNavParamList, PinPoint, SearchCampaign, UpdateCampaignComment } from '@types';
import React, { useEffect, useState } from 'react'
import { API } from '../../api';
import { RefreshControl } from 'react-native';
import { useAuthContext, useLoadingContext, modalNavigation, mainNavigation } from '../../useHook';

import { ScrollView } from 'react-native-gesture-handler';
import { ButtonTabs, ConfirmAlert, Container, DefaultAlert, SelectionAlert } from '../../atoms';
import { ProfileCard, CommentList, CouponListTab, PinPointListTab } from '../../components/CampaignDetailStack';
import Footer from '../../components/Footer';
import { searchCampaignToMakeCampaign } from '../../util';

const CampaignDetailStack = () => {
    const { useLoading: { startLoading, endLoading } } = useLoadingContext()
    const { auth: { userToken } } = useAuthContext()
    if (userToken === undefined) return <></>;
    const isFocused = useIsFocused()
    const { params: { campaign } } = useRoute<RouteProp<ModalNavParamList, 'CampaignDetailStack'>>();

    // state
    const [campaignProfile, setCampaignProfile] = useState<CampaginProfile>(campaign);
    const [isParticipate, setIsParticipate] = useState(false);
    const [tabIdx, setTabIdx] = useState(0);
    const [pinPointList, setPinPointList] = useState<PinPoint[]>([]);
    const [couponList, setCouponList] = useState<Coupon[]>([]);
    const [commentList, setCommentList] = useState<CampaignComment[]>(campaign.comments);
    const [refreshing, setRefreshing] = useState(false);

    // api
    const checkIsPlaying = async () => {
        const { result, data, error, errdesc } = await API.campaignCheckPlaying({ caid: campaign.id, uid: userToken.id })
        if (result === "failed" || data === undefined)
            return DefaultAlert({ title: "참여 여부 조회 실패", subTitle: `${error} ${errdesc}` })

        setIsParticipate(data === "이미 참여중인 캠페인 입니다.");
    }
    const getPinPoints = async () => {
        const { result, data, error, errdesc } = await API.pinPointRead({ type: 'list', value: campaign.id });
        if (result === "failed" || data === undefined)
            return DefaultAlert({ title: "핀포인트 가져오기 실패", subTitle: `${error} ${errdesc}` })

        setPinPointList(data)
    }
    const getCoupons = async () => {
        const { result, data, error, errdesc } = await API.couponRead({ type: 'campaign', value: campaign.id });
        if (result === "failed" || data === undefined)
            return DefaultAlert({ title: "쿠폰 가져오기 실패", subTitle: `${error} ${errdesc}` })

        setCouponList(data)
    }
    const getCampaign = async () => {
        const { result, data, error, errdesc } = await API.campaignSearch({ type: 'id', value: campaign.id, condition: "exact" })
        if (result === "failed" || data === undefined)
            return DefaultAlert({ title: error, subTitle: errdesc });

        const cam = data[0];
        setCampaignProfile(cam)
        setCommentList(cam.comments)
    }

    useEffect(() => {
        if (isFocused)
            onRefresh();
    }, [isFocused])

    // navigation
    const modalNav = modalNavigation();
    const mainNav = mainNavigation();
    const navtoPinPointDetail = (pinpoint: PinPoint) => {
        modalNav.navigate('PinPointDetailStack', { pinpoint, cid: campaign.id, campaignName: campaign.name })
    }
    const navToCouponDetail = (coupon: Coupon) => {
        modalNav.navigate('CouponDetailStack', { coupon, campaignName: campaign.name })
    }
    const navToWriteComment = (comment: UpdateCampaignComment | null) => {
        mainNav.navigate('EditModalNav', { screen: 'WriteCampaignCommentStack', params: { caid: campaign.id, cname: campaign.name, comment } })
    }

    // usecase
    const onRefresh = () => {
        const init = async () => {
            setRefreshing(true);
            await getCampaign();
            await checkIsPlaying();
            await getPinPoints();
            await getCoupons();
            setTimeout(() => setRefreshing(false), 500);
        }
        init();
    }

    const onParticipate = async () => {
        startLoading();
        const { result, data, error, errdesc } = await API.campaignParticiapte({ caid: campaign.id, uid: userToken.id })

        if (result === "failed" || data === undefined)
            return DefaultAlert({ title: "캠페인 참여 실패", subTitle: `${errdesc}`, onPress: endLoading })

        SelectionAlert({
            title: "캠페인에 참여하게 되었습니다!",
            buttons: [
                {
                    text: "나의 캠페인 정보를 확인하기",
                    onPress: () => {
                        mainNav.navigate("ModalNav", { screen: 'MyDetailStack', params: { selectedIndex: 1 } });
                        endLoading();
                    }
                },
                {
                    text: "모험을 시작하기",
                    onPress: () => {
                        mainNav.navigate("HomeTab", { screen: "GameStack" })
                        endLoading();
                    }
                }
            ],
            onConfirm: () => {
                endLoading();
                onRefresh();
            }
        })
    }
    const onWithDarw = () => {
        const init = async () => {
            startLoading();

            const { result, data, error, errdesc } = await API.campaignWithdraw({ caid: campaign.id, uid: userToken.id })
            if (result === "failed")
                return DefaultAlert({ title: error, subTitle: errdesc, onPress: endLoading });

            DefaultAlert({ title: "성공적으로 탈퇴했습니다." })
            onRefresh();
            endLoading();
        }
        ConfirmAlert({ title: "정말 캠페인을 탈퇴하시겠습니까?", subTitle: "참여한 데이터를 모두 잃게 됩니다.", onConfirm: init });
    }
    const onEdit = () => {
        const makeCampaign: MakeCampaign = searchCampaignToMakeCampaign(campaign, pinPointList, couponList);
        mainNav.navigate("MakeCampaignNav", { screen: "MakeCampaignStack", params: { campaign: makeCampaign } })
    }

    const onDeleteCampaign = () => {
        const init = async () => {
            startLoading();

            const { result, data, error, errdesc } = await API.campaignDelete({ caid: campaign.id, uid: userToken.id })
            if (result === "failed")
                return DefaultAlert({ title: error, subTitle: errdesc, onPress: endLoading });

            DefaultAlert({ title: "성공적으로 삭제되었습니다." })
            mainNav.navigate("HomeTab", { screen: "CampaignStack" })
            endLoading();
        }
        ConfirmAlert({ title: "정말 캠페인을 삭제 하시겠습니까?", subTitle: "해당 캠페인 관련된 모든 데이터를 잃게 됩니다.", onConfirm: init });

    }

    const onDeleteComment = (rid: string) => {
        const init = async () => {
            // 리뷰를 찾을 수 없습니다 에러..
            const { result, data, error, errdesc } = await API.campaignCommentDelete({ caid: campaign.id, rid, uid: userToken.id });
            if (result === 'failed' || data === undefined) {
                DefaultAlert({ title: error, subTitle: errdesc });
                return;
            }
            onRefresh();
        }
        ConfirmAlert({ title: "정말 삭제하시겠습니까?", onConfirm: () => init() })
    }

    return (
        <Container>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <ProfileCard
                    campaignProfile={campaignProfile}
                    isParticipate={isParticipate}
                    onParticipate={onParticipate}
                    onWithDarw={onWithDarw}
                    onEdit={onEdit}
                    onDeleteCampaign={onDeleteCampaign}
                    refreshing={refreshing}
                />

                <ButtonTabs
                    selectedIndex={tabIdx}
                    onPress={setTabIdx}
                    buttons={["핀포인트 리스트", "쿠폰 리스트"]}
                    viewList={[
                        <PinPointListTab pinPointList={pinPointList} navtoPinPointDetail={navtoPinPointDetail} refreshing={refreshing} />,
                        <CouponListTab couponList={couponList} navToCouponDetail={navToCouponDetail} />
                    ]}
                />

                <CommentList
                    commentList={commentList}
                    navToWriteComment={navToWriteComment}
                    onDeleteComment={onDeleteComment}
                    refreshing={refreshing}
                />

                <Footer />
            </ScrollView>
        </Container>
    )
}

export default CampaignDetailStack
