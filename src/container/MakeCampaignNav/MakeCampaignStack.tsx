import React, { useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/core';
import { MakeCampaignNavParamList, MakePinPoint, MakeCoupon, MakeCampaign } from '@types';
import { mainNavigation, makeCampaignNavigation } from '../../navigation/useNavigation';
import { perventGoBack, useAuthContext, useLoadingContext, useSubmit } from '../../useHook';

import { ScrollWrapper, SubmitButton, DefaultAlert } from '../../atoms';
import CampaignBox from '../../components/MakeCampaignStack/CampaignBox';
import PinPointListBox from '../../components/MakeCampaignStack/PinPointListBox';
import CouponListBox from '../../components/MakeCampaignStack/CouponListBox';
import { isBlank } from '../../util';
import { API } from '../../api';

const MakeCampaignStack = () => {
    const { auth: { userToken } } = useAuthContext();
    const { useLoading: { endLoading, startLoading } } = useLoadingContext();
    const { params: { pinpoint, coupon, editIndex } } = useRoute<RouteProp<MakeCampaignNavParamList, 'MakeCampaignStack'>>();
    const mainNav = mainNavigation();
    const makeCampaignNav = makeCampaignNavigation();

    const [title, setTitle] = useState("");
    const [campaignImgs, setCampaignImgs] = useState<string[]>([]);
    const [description, setDescription] = useState("");
    const [pinPointList, setPinPointList] = useState<MakePinPoint[]>([]);
    const [couponList, setCouponList] = useState<MakeCoupon[]>([]);

    useEffect(() => {
        if (pinpoint) {
            setPinPointList(editIndex !== undefined ? [...pinPointList.slice(0, editIndex), pinpoint, ...pinPointList.splice(editIndex + 1)]
                : [...pinPointList, pinpoint])
        }
    }, [pinpoint])
    useEffect(() => {
        if (coupon) {
            setCouponList(editIndex !== undefined ? [...couponList.slice(0, editIndex), coupon, ...couponList.splice(editIndex + 1)]
                : [...couponList, coupon])
        }
    }, [coupon])

    // PinPointList
    const navToPinPointModal = (item?: MakePinPoint, idx?: number) => {
        makeCampaignNav.navigate("MakePinPointStack", { pinpoint: item, editIndex: idx })
    }
    const deletePinPoint = (idx: number) => {
        setPinPointList([...pinPointList.slice(0, idx), ...pinPointList.slice(idx + 1)])
    }

    // CouponList
    const navToCouponModal = (item?: MakeCoupon, idx?: number) => {
        makeCampaignNav.navigate("MakeCouponStack", { coupon: item, editIndex: idx, pinPointList })
    }
    const deleteCoupon = (idx: number) => {
        setCouponList([...couponList.slice(0, idx), ...couponList.slice(idx + 1)])
    }

    const getCampaign = (): MakeCampaign => {
        if (userToken === undefined) throw new Error("userToken undefined error");

        return {
            ownner: userToken.id,
            name: title,
            description,
            imgs: campaignImgs,
            pinpoints: pinPointList,
            coupons: couponList,
            region: "임시지역"
        }
    }
    /* 캠페인 제작 송신 */
    const onCreateCampaign = async () => {
        if (isBlank([title, description])) {
            DefaultAlert({ title: "필수 입력을 확인해주세요", subTitle: "캠페인 제목과 설명 입력은 필수입니다." })
            return;
        }
        if (pinPointList.length === 0) {
            DefaultAlert({ title: "아직은 부족해 🥺", subTitle: "적어도 하나이상의 핀포인트를 만들어 주세요." })
            return;
        }

        startLoading();
        const { result, data, error, errdesc } = await API.campaignCreate(getCampaign());
        if (result === "success") {
            DefaultAlert({
                title: "캠페인 생성 완료",
                subTitle: data ? data : "",
                btColor: "default",
                onPress: () => {
                    endLoading();
                    onSubmit();
                }
            })
        }
        else {
            DefaultAlert({
                title: error,
                subTitle: errdesc,
                onPress: () => {
                    endLoading();
                }
            })
        }
    }
    const { isSubmit, onSubmit } = useSubmit({
        submitFunc: async () => {
            mainNav.navigate("HomeTab", { screen: "CampaignStack" })
        }
    });
    const hasUnsavedChanges = Boolean(title || description || campaignImgs.length || pinPointList.length || couponList.length)
        && !isSubmit;
    perventGoBack({ hasUnsavedChanges });

    return (
        <ScrollWrapper>
            <CampaignBox
                useTitle={[title, setTitle]}
                useCampaignImgs={[campaignImgs, setCampaignImgs]}
                useDescription={[description, setDescription]}
            />

            <PinPointListBox
                pinPointList={pinPointList}
                deletePinPoint={deletePinPoint}
                navToPinPointModal={navToPinPointModal}
            />

            <CouponListBox
                couponList={couponList}
                deleteCoupon={deleteCoupon}
                navToCouponModal={navToCouponModal}
            />

            <SubmitButton title={"캠페인 만들기"} onPress={onCreateCampaign} />
        </ScrollWrapper>
    )
}

export default MakeCampaignStack;
