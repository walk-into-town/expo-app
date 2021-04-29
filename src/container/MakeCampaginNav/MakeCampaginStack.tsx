import React, { useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/core';
import { PinPoint, Coupon, MakeCampaginStackParamList } from '@types';
import { ScrollWrapper } from '../../atoms/styled';
import { mainNavigation, makeCampaginNavigation } from '../../navigation/useNavigation';
import CampaginBox from '../../components/MakeCampaginStack/CampaginBox';
import PinPointListBox from '../../components/MakeCampaginStack/PinPointListBox';
import { $$, perventGoBack } from '../../util';
import CouponListBox from '../../components/MakeCampaginStack/CouponListBox';
import SubmitCampaginButton from '../../components/MakeCampaginStack/SubmitCampaginButton';

const MakeCampaginStack = () => {
    const { params: { pinpoint, coupon, editIndex } } = useRoute<RouteProp<MakeCampaginStackParamList, 'MakeCampaginStack'>>();
    const mainNav = mainNavigation();
    const makeCampaginNav = makeCampaginNavigation();

    const [title, setTitle] = useState("");
    const [campaginImgs, setCampaginImgs] = useState<string[]>([]);
    const [depiction, setDepiction] = useState("");
    const [pinPointList, setPinPointList] = useState<PinPoint[]>([]);
    const [couponList, setCouponList] = useState<Coupon[]>([]);

    const hasUnsavedChanges = Boolean(title || depiction || campaginImgs.length || pinPointList.length || couponList.length);
    perventGoBack({ hasUnsavedChanges });

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
        makeCampaginNav.navigate("MakePinPointStack", $$.isUndefined([item, idx]) ? {} : { pinpoint: item, editIndex: idx })
    }
    const deletePinPoint = (idx: number) => {
        setPinPointList([...pinPointList.slice(0, idx), ...pinPointList.slice(idx + 1)])
    }

    // CouponList
    const navToCouponModal = (item?: Coupon, idx?: number) => {
        makeCampaginNav.navigate("MakeCouponStack", $$.isUndefined([item, idx]) ? {} : { coupon: item, editIndex: idx })
    }
    const deleteCoupon = (idx: number) => {
        setCouponList([...couponList.slice(0, idx), ...couponList.slice(idx + 1)])
    }

    const onSubmit = async () => {
        mainNav.navigate("HomeTab", { screen: "CampaignStack" });
    }

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

            <SubmitCampaginButton onSubmit={onSubmit} />
        </ScrollWrapper>
    )
}

export default MakeCampaginStack;
