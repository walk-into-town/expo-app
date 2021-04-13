import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Input } from 'react-native-elements';
import { TextArea } from '../../atoms';
import DateInput from '../../atoms/DateInput';
import ImgPicker from '../../atoms/ImgPicker';
import { Container } from '../../atoms/styled'
import TitleInputModal from '../../atoms/TitleInputModal';

interface Props {

}

const MakeCouponModal = (props: Props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [endDate, setEndDate] = useState("");
    const [limit, setLimit] = useState("");
    const [couponImgs, setCouponImgs] = useState<string[]>([]);

    return (
        <Container>
            <TitleInputModal useTitle={[title, setTitle]}/>
            
            <TextArea
                value={description}
                onChangeText={(text: string) => setDescription(text)}
                placeholder="쿠폰의 상세 설명" />

            <ImgPicker useImgs={[couponImgs, setCouponImgs]} />

            <Input
                keyboardType="numeric"
                value={limit}
                onChangeText={(text: string) => { setLimit(text.replace(/[^0-9]/g, '')) }}
                placeholder="쿠폰 배포수" />

            <DateInput useDate={[endDate, setEndDate]}/>

        </Container>
    )
}

export default MakeCouponModal
