import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-elements';
import { Coupon, MakeCampaginStackParamList, ModalStackParamList } from '@types';
import { ImgPicker, OutLineButton, InputModal } from '../../atoms';
import { ScrollWrapper, SubTitle } from '../../atoms/styled'
import DateTimePicker from '@react-native-community/datetimepicker';
import perventGoBack from '../../util/perventGoBack';
import { makeCampaginNavigation } from '../../navigation/useNavigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { isEditCoupon } from '../../util';

const MakeCoupon = () => {
    const campaginNav = makeCampaginNavigation();
    const nav = useNavigation();
    const { params: { coupon, editIndex } } = useRoute<RouteProp<MakeCampaginStackParamList, 'MakeCoupon'>>();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [endDate, setEndDate] = useState(new Date());
    const [limit, setLimit] = useState("");
    const [goods, setGoods] = useState<string[]>([])
    const [couponImgs, setCouponImgs] = useState<string[]>([]);

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
    // const hasUnsavedChanges = Boolean(name);
    const hasUnsavedChanges = Boolean(coupon ? isEditCoupon(coupon, getCoupon())
        : name || description || limit || couponImgs.length
    )
    perventGoBack({ hasUnsavedChanges })

    const onSubmit = () => {
        campaginNav.navigate("MakeCampagin", { coupon: getCoupon(), editIndex })
    }

    return (
        <ScrollWrapper>
            <InputModal
                useText={[name, setName]}
                placeholder="쿠폰명을 입력해주세요" />

            <InputModal
                useText={[description, setDescription]}
                placeholder="쿠폰의 상세설명을 입력해주세요."
                type='textarea' />

            <ImgPicker useImgs={[couponImgs, setCouponImgs]} />

            <InputModal
                useText={[limit, setLimit]}
                placeholder="쿠폰 배포 수량"
                type="number"
                subTitle="해당 개수만큼 배포됩니다"
            />

            <SubTitle>쿠폰 상품</SubTitle>
            <OutLineButton title="쿠폰 상품 추가" />

            <SubTitle style={{ marginTop: 20 }}>쿠폰 만기 날짜</SubTitle>
            <DateTimePicker
                value={endDate}
                display="spinner"
                onChange={(event: any, selectedDate: any) => setEndDate(selectedDate || endDate)}
                minimumDate={new Date()} />

            <Button
                title={editIndex !== undefined ? "쿠폰 수정하기" : "쿠폰 추가하기"}
                onPress={onSubmit}
                style={{ marginVertical: 30 }}
                titleStyle={{ fontFamily: "SCDream7" }} />
        </ScrollWrapper>
    )
}

export default MakeCoupon;
