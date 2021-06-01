import React, { useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/core';
import { MakeCampaignNavParamList, MakePinPoint, MakeCoupon, MakeCampaign } from '@types';
import { perventGoBack, useAuthContext, useLoadingContext, useSubmit, mainNavigation, makeCampaignNavigation } from '../../useHook';

import { ScrollWrapper, SubmitButton, DefaultAlert, SelectionAlert } from '../../atoms';
import CampaignBox from '../../components/MakeCampaignStack/CampaignBox';
import PinPointListBox from '../../components/MakeCampaignStack/PinPointListBox';
import CouponListBox from '../../components/MakeCampaignStack/CouponListBox';
import { getDummySearchCampaign, isBlank, isLocalFile } from '../../util';
import { API } from '../../api';
import axios from 'axios';

const MakeCampaignStack = () => {
    const { auth: { userToken } } = useAuthContext();
    const { useLoading: { endLoading, startLoading } } = useLoadingContext();
    const { params: { campaign, pinpoint, coupon, editIndex } } = useRoute<RouteProp<MakeCampaignNavParamList, 'MakeCampaignStack'>>();
    const mainNav = mainNavigation();
    const makeCampaignNav = makeCampaignNavigation();

    const [title, setTitle] = useState(campaign?.name || "");
    const [campaignImgs, setCampaignImgs] = useState<string[]>(campaign?.imgs || []);
    const [description, setDescription] = useState(campaign?.description || "");
    const [pinPointList, setPinPointList] = useState<MakePinPoint[]>(campaign?.pinpoints || []);
    const [couponList, setCouponList] = useState<MakeCoupon[]>(campaign?.coupons || []);
    const [region, setRegion] = useState<string>(campaign?.region || "");

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

    const setCampaignRegion = async () => {
        if (pinPointList.length !== 0) {
            const lat = pinPointList[0].latitude
            const long = pinPointList[0].longitude
            const { data: { results } } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&language=ko&key=AIzaSyA-4i3FV1KLsJbsyVySpYi4YIwxIkEXFlw`);

            let fullAddress = results[0].formatted_address
            let splitAddress = fullAddress.split(" ");

            if (splitAddress[1].charAt(splitAddress.length - 1) === "시") {
                setRegion(splitAddress[1])
            }
            else {
                setRegion(splitAddress[2])
            }
        }
        else DefaultAlert({ title: "핀포인트를 먼저 설정 하세요", subTitle: "아직 핀포인트가 설정되어있지 않습니다." })

    }


    const getCampaign = (): MakeCampaign => {
        if (userToken === undefined) throw new Error("userToken undefined error");

        return {
            id: campaign?.id,
            ownner: userToken.id,
            name: title,
            description,
            imgs: campaignImgs,
            pinpoints: pinPointList,
            coupons: couponList,
            region: region
        }
    }

    /* 캠페인 제작 송신 */
    const onCheck = (): boolean => {
        if (isBlank([title, description])) {
            DefaultAlert({ title: "필수 입력을 확인해주세요", subTitle: "캠페인 제목과 설명 입력은 필수입니다." })
            return false;
        }
        if (pinPointList.length === 0) {
            DefaultAlert({ title: "아직은 부족해 🥺", subTitle: "적어도 하나이상의 핀포인트를 만들어 주세요." })
            return false;
        }
        if (region === "") {
            DefaultAlert({ title: "지역을 설정해주세요" })
            return false;
        }
        if (isLocalFile(campaignImgs)) {
            DefaultAlert({ title: "사진을 서버로 먼저 전송해주세요!" })
            return false;
        }
        return true
    }
    const onCreateCampaign = async () => {
        if (!onCheck()) return;
        startLoading();
        const cam = getCampaign();
        const { result, data, error, errdesc } = await API.campaignCreate(getCampaign());
        if (result !== "success" || data === undefined)
            return DefaultAlert({
                title: error,
                subTitle: errdesc,
                onPress: () => {
                    endLoading();
                }
            })

        SelectionAlert({
            title: "캠페인 생성 완료",
            buttons: [
                {
                    text: "캠페인 디테일 화면 확인", onPress: () => {
                        mainNav.navigate("ModalNav", { screen: "CampaignDetailStack", params: { campaign: getDummySearchCampaign(data) } });
                        endLoading();
                    }
                },
                {
                    text: "내 캠페인 리스트 확인", onPress: () => {
                        mainNav.navigate("ModalNav", { screen: "MyDetailStack", params: { selectedIndex: 0 } });
                        endLoading();
                    }
                }
            ],
            onConfirm: () => {
                endLoading()
                mainNav.navigate("HomeTab", { screen: "CampaignStack" })
            }
        })
    }
    const onUpdateCamapign = async () => {
        if (!onCheck()) return;
        startLoading();
        const { result, data, error, errdesc } = await API.campaignUpdate(getCampaign());
        if (result !== "success" || data === undefined)
            return DefaultAlert({
                title: error,
                subTitle: errdesc,
                onPress: () => {
                    endLoading();
                }
            })

        const cid = campaign?.id || "error"
        mainNav.navigate("ModalNav", { screen: "CampaignDetailStack", params: { campaign: getDummySearchCampaign(cid) } });
        endLoading();
    }

    const { isSubmit, onSubmit } = useSubmit({
        submitFunc: async () => {
            if (campaign?.id !== undefined)
                await onUpdateCamapign();
            else
                await onCreateCampaign();
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
                useRegion={[region, setRegion]}
                pinPointList={pinPointList}
                setCampaignRegion={setCampaignRegion}
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

export default MakeCampaignStack;
