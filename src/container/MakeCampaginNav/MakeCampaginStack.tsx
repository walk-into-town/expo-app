import React, { useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/core';
import { PinPoint, Coupon, MakeCampaginStackParamList } from '@types';
import { mainNavigation, makeCampaginNavigation } from '../../navigation/useNavigation';
import { perventGoBack, useSubmit } from '../../useHook';

import { ScrollWrapper, SubmitButton } from '../../atoms';
import CampaginBox from '../../components/MakeCampaginStack/CampaginBox';
import PinPointListBox from '../../components/MakeCampaginStack/PinPointListBox';
import CouponListBox from '../../components/MakeCampaginStack/CouponListBox';

const MakeCampaginStack = () => {
    const { params: { pinpoint, coupon, editIndex } } = useRoute<RouteProp<MakeCampaginStackParamList, 'MakeCampaginStack'>>();
    const mainNav = mainNavigation();
    const makeCampaginNav = makeCampaginNavigation();

    const [title, setTitle] = useState("");
    const [campaginImgs, setCampaginImgs] = useState<string[]>([]);
    const [depiction, setDepiction] = useState("");
    const [pinPointList, setPinPointList] = useState<PinPoint[]>([]);
    const [couponList, setCouponList] = useState<Coupon[]>([]);

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
    const navToPinPointModal = (item?: PinPoint, idx?: number) => {
        // 새로운 핀포인트를 만들 땐 비어 있는 pinpoint를 보내게 된다.
        makeCampaginNav.navigate("MakePinPointStack", { pinpoint: item, editIndex: idx })
    }
    const deletePinPoint = (idx: number) => {
        setPinPointList([...pinPointList.slice(0, idx), ...pinPointList.slice(idx + 1)])
    }

    // CouponList
    const navToCouponModal = (item?: Coupon, idx?: number) => {
        makeCampaginNav.navigate("MakeCouponStack", { coupon: item, editIndex: idx })
    }
    const deleteCoupon = (idx: number) => {
        setCouponList([...couponList.slice(0, idx), ...couponList.slice(idx + 1)])
    }

    const { isSubmit, onSubmit } = useSubmit({
        submitFunc: async () => {
            mainNav.navigate("HomeTab", { screen: "CampaignStack" });
        }
    });
    const hasUnsavedChanges = Boolean(title || depiction || campaginImgs.length || pinPointList.length || couponList.length) && !isSubmit;
    perventGoBack({ hasUnsavedChanges });

    return (
        <ScrollWrapper>
            <CampaginBox
                useTitle={[title, setTitle]}
                useCampaginImgs={[campaginImgs, setCampaginImgs]}
                useDepiction={[depiction, setDepiction]}
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
