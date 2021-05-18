import React, { useEffect, useState } from 'react'
import { MakeCampaignNavParamList, MakeCoupon } from '@types';
import { makeCampaignNavigation } from '../../navigation/useNavigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { perventGoBack, useSubmit } from '../../useHook';
import { isBlank, isEditCoupon } from '../../util';

import { ScrollWrapper, SubmitButton, DefaultAlert } from '../../atoms';
import CouponBaseInputs from '../../components/MakeCouponStack/CouponBaseInputs';
import EndDatePicker from '../../components/MakeCouponStack/EndDatePicker';
import PaymentConditionPicker from '../../components/MakeCouponStack/PaymentConditionPicker';

const MakeCouponStack = () => {
    const campaginNav = makeCampaignNavigation();
    const nav = useNavigation();
    const { params: { coupon, editIndex, pinPointList } } = useRoute<RouteProp<MakeCampaignNavParamList, 'MakeCouponStack'>>();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [couponImg, setCouponImg] = useState<string>("");
    const [limit, setLimit] = useState("");
    const [goods, setGoods] = useState<string>("");
    const now = new Date();
    const [endDate, setEndDate] = useState(new Date(now.setFullYear(now.getFullYear() + 1)));
    // -1 : 캠페인 클리어, 값: pinPointList index
    const [paymentCondition, setPaymentCondition] = useState(-1);

    useEffect(() => {
        if (coupon === undefined) return

        if (editIndex !== undefined) nav.setOptions({ headerTitle: "쿠폰 수정하기" })

        setName(coupon.name)
        setDescription(coupon.description);
        setCouponImg(coupon.img);
        setEndDate(new Date(coupon.endDate));
        setGoods(coupon.goods);
        setLimit(coupon.limit.toString());
        setPaymentCondition(coupon.paymentCondition);
    }, [coupon])

    const getCoupon: () => MakeCoupon = () => {
        return {
            name,
            description,
            endDate: endDate.toISOString(),
            limit: Number(limit),
            goods,
            img: couponImg,
            paymentCondition
        }
    }

    const { isSubmit, onSubmit } = useSubmit({
        submitFunc: () => {
            if (isBlank([name, description, limit])) {
                DefaultAlert({ title: "필수 입력을 확인해주세요", subTitle: "캠페인 제목과 설명 입력은 필수입니다." })
                return;
            }
            campaginNav.navigate("MakeCampaignStack", { coupon: getCoupon(), editIndex })
        }
    });
    const hasUnsavedChanges = Boolean(coupon ? isEditCoupon(coupon, getCoupon())
        : name || description || limit || couponImg.length
    ) && !isSubmit;
    perventGoBack({ hasUnsavedChanges });

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
