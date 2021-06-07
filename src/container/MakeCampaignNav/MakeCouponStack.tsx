import React, { useEffect, useState } from 'react'
import { MakeCampaignNavParamList, MakeCoupon } from '@types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { perventGoBack, useSubmit, makeCampaignNavigation } from '../../useHook';
import { isBlank, isEditCoupon, isLocalFile } from '../../util';

import { ScrollWrapper, SubmitButton, DefaultAlert } from '../../atoms';
import CouponBaseInputs from '../../components/MakeCouponStack/CouponBaseInputs';
import EndDatePicker from '../../components/MakeCouponStack/EndDatePicker';
import PaymentConditionPicker from '../../components/MakeCouponStack/PaymentConditionPicker';

const MakeCouponStack = () => {
    const campaginNav = makeCampaignNavigation();
    const nav = useNavigation();
    const { params: { coupon, editIndex, pinPointList } } = useRoute<RouteProp<MakeCampaignNavParamList, 'MakeCouponStack'>>();

    const [name, setName] = useState(coupon?.name || "");
    const [description, setDescription] = useState(coupon?.description || "");
    const [couponImg, setCouponImg] = useState<string>(coupon?.imgs || "");
    const [limit, setLimit] = useState(coupon?.limit.toString() || "");
    const [goods, setGoods] = useState<string>(coupon?.goods || "");
    const now = new Date();
    const [endDate, setEndDate] = useState(new Date(coupon?.endDate || now.setFullYear(now.getFullYear() + 1)));
    // -1 : 캠페인 클리어, 값: pinPointList index
    const [paymentCondition, setPaymentCondition] = useState(coupon?.paymentCondition || -1);

    useEffect(() => {
        if (editIndex !== undefined)
            campaginNav.setOptions({ headerTitle: "쿠폰 수정하기" })
    }, [coupon])

    const getCoupon: () => MakeCoupon = () => {
        return {
            id: coupon?.id,
            name,
            description,
            endDate: endDate.toISOString(),
            limit: Number(limit),
            goods,
            imgs: couponImg,
            paymentCondition
        }
    }

    const onSubmit = () => {
        if (isBlank([name, description, limit]))
            return DefaultAlert({ title: "필수 입력을 확인해주세요", subTitle: "캠페인 제목과 설명 입력은 필수입니다." })

        if (isLocalFile([couponImg]))
            return DefaultAlert({ title: "사진을 서버로 먼저 전송해주세요!" })

        console.log(getCoupon())
        nav.goBack()
        campaginNav.navigate("MakeCampaignStack", { coupon: getCoupon(), editIndex })
    }
    // const { isSubmit, onSubmit } = useSubmit({
    //     submitFunc: async () => {
    //         if (isBlank([name, description, limit]))
    //             return DefaultAlert({ title: "필수 입력을 확인해주세요", subTitle: "캠페인 제목과 설명 입력은 필수입니다." })

    //         if (isLocalFile([couponImg]))
    //             return DefaultAlert({ title: "사진을 서버로 먼저 전송해주세요!" })

    //         nav.goBack()
    //         campaginNav.navigate("MakeCampaignStack", { coupon: getCoupon(), editIndex })
    //     }
    // });
    // const hasUnsavedChanges = Boolean(coupon ? isEditCoupon(coupon, getCoupon())
    //     : name || description || limit || couponImg.length
    // ) && !isSubmit;
    // perventGoBack({ hasUnsavedChanges });

    return (
        <ScrollWrapper>
            <CouponBaseInputs
                useName={[name, setName]}
                useDescription={[description, setDescription]}
                useCouponImg={[couponImg, setCouponImg]}
                useLimit={[limit, setLimit]}
                useGoods={[goods, setGoods]}
            />
            <EndDatePicker useEndDate={[endDate, setEndDate]} />
            <PaymentConditionPicker
                pinPointList={pinPointList}
                usePaymentCondition={[paymentCondition, setPaymentCondition]}
            />

            <SubmitButton title={editIndex !== undefined ? "쿠폰 수정하기" : "쿠폰 추가하기"} onPress={onSubmit} />
        </ScrollWrapper>
    )
}

export default MakeCouponStack;
