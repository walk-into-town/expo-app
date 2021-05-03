import React, { useEffect, useState } from 'react'
import { Coupon, MakeCampaginStackParamList } from '@types';
import { makeCampaginNavigation } from '../../navigation/useNavigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { perventGoBack, useSubmit } from '../../useHook';
import { isEditCoupon } from '../../util';

import { ScrollWrapper, SubmitButton } from '../../atoms';
import MakeCoupon from '../../components/MakeCouponStack/MakeCoupon';
import AddCouponGoods from '../../components/MakeCouponStack/AddCouponGoods';
import EndDatePicker from '../../components/MakeCouponStack/EndDatePicker';

const MakeCouponStack = () => {
    const campaginNav = makeCampaginNavigation();
    const nav = useNavigation();
    const { params: { coupon, editIndex } } = useRoute<RouteProp<MakeCampaginStackParamList, 'MakeCouponStack'>>();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [couponImgs, setCouponImgs] = useState<string[]>([]);
    const [limit, setLimit] = useState("");
    const [goods, setGoods] = useState<string[]>([]);
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        if (coupon === undefined) return

        if (editIndex !== undefined) nav.setOptions({ headerTitle: "쿠폰 수정하기" })

        setName(coupon.name)
        setDescription(coupon.description);
        setCouponImgs(coupon.imgs);
        setEndDate(new Date(coupon.endDate));
        setGoods(coupon.goods);
        setLimit(coupon.limit);
    }, [coupon])

    const getCoupon: () => Coupon = () => {
        return {
            name,
            description,
            endDate: endDate.toISOString(),
            limit,
            goods,
            imgs: couponImgs
        }
    }

    const { isSubmit, onSubmit } = useSubmit({
        submitFunc: () => {
            campaginNav.navigate("MakeCampaginStack", { coupon: getCoupon(), editIndex })
        }
    });
    const hasUnsavedChanges = Boolean(coupon ? isEditCoupon(coupon, getCoupon())
        : name || description || limit || couponImgs.length
    ) && !isSubmit;
    perventGoBack({ hasUnsavedChanges });

    return (
        <ScrollWrapper>
            <MakeCoupon
                useName={[name, setName]}
                useDescription={[description, setDescription]}
                useCouponImgs={[couponImgs, setCouponImgs]}
                useLimit={[limit, setLimit]}
            />
            <AddCouponGoods useGoods={[goods, setGoods]} />
            <EndDatePicker useEndDate={[endDate, setEndDate]} />

            <SubmitButton title={editIndex !== undefined ? "쿠폰 수정하기" : "쿠폰 추가하기"} onPress={onSubmit} />
        </ScrollWrapper>
    )
}

export default MakeCouponStack;
