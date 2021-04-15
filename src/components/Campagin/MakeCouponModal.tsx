import React, { useState } from 'react'
import { Button, Input } from 'react-native-elements';
import { DateInput, ImgPicker, OutLineButton, InputModal } from '../../atoms';
import { Container, SubTitle } from '../../atoms/styled'
import { Coupon } from '@types';

interface Props {

}

const MakeCouponModal = (props: Props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [endDate, setEndDate] = useState("");
    const [limit, setLimit] = useState("");
    const [goods, setGoods] = useState<string[]>([])
    const [couponImgs, setCouponImgs] = useState<string[]>([]);

    const onSubmit = () => {
        const coupon: Coupon = {
            name,
            description,
            endDate,
            limit,
            goods,
            imgs: couponImgs
        }
    }

    return (
        <Container>
            <InputModal useText={[name, setName]} />

            <InputModal
                useText={[description, setDescription]}
                placeholder="쿠폰의 상세설명을 입력해주세요."
                type='textarea' />

            <ImgPicker useImgs={[couponImgs, setCouponImgs]} />

            <SubTitle>쿠폰 상품</SubTitle>
            <OutLineButton title="쿠폰 상품 추가" />

            <Input
                keyboardType="numeric"
                value={limit}
                onChangeText={(text: string) => { setLimit(text.replace(/[^0-9]/g, '')) }}
                placeholder="쿠폰 배포수" />

            <DateInput useDate={[endDate, setEndDate]} />
            <Button
                title="쿠폰 추가하기"
                onPress={onSubmit}
                style={{ marginTop: 30 }}
                titleStyle={{ fontFamily: "SCDream7" }} />
        </Container>
    )
}

export default MakeCouponModal
