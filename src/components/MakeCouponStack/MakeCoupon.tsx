import { TuseState } from '@types';
import React from 'react'
import { ImgPicker, InputModal } from '../../atoms'

interface Props {
    useName: TuseState<string>,
    useDescription: TuseState<string>,
    useCouponImgs: TuseState<string[]>,
    useLimit: TuseState<string>,
}

const MakeCoupon = (props: Props) => {
    const [name, setName] = props.useName;
    const [description, setDescription] = props.useDescription;
    const [couponImgs, setCouponImgs] = props.useCouponImgs;
    const [limit, setLimit] = props.useLimit;

    return (
        <>
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
        </>
    )
}

export default MakeCoupon
