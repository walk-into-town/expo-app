import React, { useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/core';
import { MakeCampaginStackParamList, MakePinPoint, MakeCoupon, MakeCampagin } from '@types';
import { mainNavigation, makeCampaginNavigation } from '../../navigation/useNavigation';
import { perventGoBack, useAuthContext, useLoadingContext, useSubmit } from '../../useHook';

import { ScrollWrapper, SubmitButton } from '../../atoms';
import CampaginBox from '../../components/MakeCampaginStack/CampaginBox';
import PinPointListBox from '../../components/MakeCampaginStack/PinPointListBox';
import CouponListBox from '../../components/MakeCampaginStack/CouponListBox';
import { isBlank } from '../../util';
import DefaultAlert from '../../atoms/DefaultAlert';
import { API } from '../../api';

const MakeCampaginStack = () => {
    const { auth: { userToken } } = useAuthContext();
    const { useLoading: { endLoading, startLoading } } = useLoadingContext();
    const { params: { pinpoint, coupon, editIndex } } = useRoute<RouteProp<MakeCampaginStackParamList, 'MakeCampaginStack'>>();
    const mainNav = mainNavigation();
    const makeCampaginNav = makeCampaginNavigation();

    const [title, setTitle] = useState("");
    const [campaginImgs, setCampaginImgs] = useState<string[]>([]);
    const [description, setDescription] = useState("");
    const [pinPointList, setPinPointList] = useState<MakePinPoint[]>([]);
    const [couponList, setCouponList] = useState<MakeCoupon[]>([]);

    useEffect(() => {
        if (pinpoint) {
            setPinPointList(editIndex !== undefined ? [...pinPointList.slice(0, editIndex), pinpoint, ...pinPointList.splice(editIndex + 1)]
                : [...pinPointList, pinpoint])
        }
        if (coupon) {
            setCouponList(editIndex !== undefined ? [...couponList.slice(0, editIndex), coupon, ...couponList.splice(editIndex + 1)]
                : [...couponList, coupon])
        }
    }, [pinpoint, coupon])

    // PinPointList
    const navToPinPointModal = (item?: MakePinPoint, idx?: number) => {
        makeCampaginNav.navigate("MakePinPointStack", { pinpoint: item, editIndex: idx })
    }
    const deletePinPoint = (idx: number) => {
        setPinPointList([...pinPointList.slice(0, idx), ...pinPointList.slice(idx + 1)])
    }

    // CouponList
    const navToCouponModal = (item?: MakeCoupon, idx?: number) => {
        makeCampaginNav.navigate("MakeCouponStack", { coupon: item, editIndex: idx, pinPointList })
    }
    const deleteCoupon = (idx: number) => {
        setCouponList([...couponList.slice(0, idx), ...couponList.slice(idx + 1)])
    }

    const getCampagin = (): MakeCampagin => {
        if (userToken === undefined) throw new Error("userToken undefined error");

        return {
            ownner: userToken.id,
            name: title,
            description,
            imgs: campaginImgs,
            pinpoints: pinPointList,
            coupons: couponList,
            region: ""
        }
    }
    /* 캠페인 제작 송신 */
    const { isSubmit, onSubmit } = useSubmit({
        submitFunc: async () => {
            if (isBlank([title, description])) {
                DefaultAlert({ title: "필수 입력을 확인해주세요", subTitle: "캠페인 제목과 설명 입력은 필수입니다." })
                return;
            }
            if (pinPointList.length === 0) {
                DefaultAlert({ title: "아직은 부족해 🥺", subTitle: "적어도 하나이상의 핀포인트를 만들어 주세요." })
                return;
            }
            const campagin = getCampagin();
            console.log(campagin)
            startLoading();
            const { result, message, error } = await API.campaginCreate(campagin);
            endLoading();
            if (result === "success") {
                DefaultAlert({ title: "캠페인 생성 완료", subTitle: message ? message : "", btColor: "default" })
                mainNav.navigate("HomeTab", { screen: "CampaignStack" });
            }
            else {
                DefaultAlert({ title: "오류", subTitle: error ? error : "" })
            }
        }
    });
    const hasUnsavedChanges = Boolean(title || description || campaginImgs.length || pinPointList.length || couponList.length) && !isSubmit;
    perventGoBack({ hasUnsavedChanges });

    return (
        <ScrollWrapper>
            <CampaginBox
                useTitle={[title, setTitle]}
                useCampaginImgs={[campaginImgs, setCampaginImgs]}
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

            <SubmitButton title={"캠페인 만들기"} onPress={onSubmit} />
        </ScrollWrapper>
    )
}

export default MakeCampaginStack;
