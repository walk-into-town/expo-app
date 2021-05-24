import { TuseState } from '@types';
import React from 'react'
import { ImgPicker, InputModal } from '../../atoms'
import SingleImgPicker from '../../atoms/SingleImgPicker';

interface Props {
    useName: TuseState<string>,
    useDescription: TuseState<string>,
    useCouponImg: TuseState<string>,
    useLimit: TuseState<string>,
    useGoods: TuseState<string>,
}

const CouponBaseInputs = (props: Props) => {
    const [name, setName] = props.useName;
    const [description, setDescription] = props.useDescription;
    const [couponImg, setCouponImg] = props.useCouponImg;
    const [limit, setLimit] = props.useLimit;
    const [goods, setGoods] = props.useGoods;

    return (
        <>
            <InputModal
                useText={[name, setName]}
                placeholder="쿠폰명을 입력해주세요" />

            <InputModal
                useText={[description, setDescription]}
                placeholder="쿠폰의 상세설명을 입력해주세요."
                type='textarea' />

            <SingleImgPicker useImg={[couponImg, setCouponImg]} />

            <InputModal
                useText={[limit, setLimit]}
                placeholder="쿠폰 배포 수량"
                type="number"
                subTitle="해당 개수만큼 배포됩니다"
            />

            <InputModal
                useText={[goods, setGoods]}
                placeholder="쿠폰 상품"
                subTitle="콤마(,)로 상품을 구분해주면 됩니다"
            />
        </>
    )
}

export default CouponBaseInputs
