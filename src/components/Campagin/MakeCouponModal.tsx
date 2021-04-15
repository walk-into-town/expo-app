import React, { useState } from 'react'
import { Button, Input, Text } from 'react-native-elements';
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
            <InputModal 
                useText={[name, setName]} 
                placeholder="쿠폰명을 입력해주세요"/>

            <InputModal
                useText={[description, setDescription]}
                placeholder="쿠폰의 상세설명을 입력해주세요."
                type='textarea' />

            <ImgPicker useImgs={[couponImgs, setCouponImgs]} />

            <SubTitle>쿠폰 상품</SubTitle>
            <OutLineButton title="쿠폰 상품 추가" />

            <InputModal
                useText={[limit, setLimit]}
                placeholder="쿠폰 배포 수량"
                type="number"
                subTitle="해당 개수만큼 배포됩니다."
                />

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
