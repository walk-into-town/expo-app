import React, { useState } from 'react'
import { Button, Input } from 'react-native-elements'
import ImgPicker from '../../atoms/ImgPicker';
import { campaginNavigation, mainNavigation } from '../../navigation/useNavigation';
import { PinPoint } from '@types';
import { SubTitle, ScrollWrapper } from '../../atoms/styled';
import { OutLineButton, TextArea } from '../../atoms';


const MakeCampagin = () => {
    const mainNav = mainNavigation();
    const campaginNav = campaginNavigation();

    const [title, setTitle] = useState("");
    const [campaginImgs, setCampaginImgs] = useState<string[]>([]);
    const [depiction, setDepiction] = useState("");
    
    const [pinPointList, setPinPointList] = useState<PinPoint[]>([]);
    const [couponList, setCouponList] = useState([]);

    return (
        <ScrollWrapper>
            <Input
                onChangeText={(text: string) => setTitle(text)}
                inputStyle={{ textAlign: "center" }}
                placeholder="캠페인 이름"
            />

            <ImgPicker useImgs={[campaginImgs, setCampaginImgs]}/>

            <TextArea
                onChangeText={(text: string) => setDepiction(text)}
                placeholder="캠페인 설명"
            />

            <SubTitle>핀포인트 리스트</SubTitle>
            <OutLineButton
                title="핀포인트 추가"
                onPress={() => mainNav.navigate("ModalStack", { screen: 'MakePinPointModal' })}
            />
            

            <SubTitle>쿠폰 리스트</SubTitle>
            <OutLineButton
                title="쿠폰 추가"
                onPress={() => mainNav.navigate("ModalStack", { screen: 'MakeCouponModal' })}
            />
            <Button
                title="캠페인 만들기"
                onPress={() => campaginNav.navigate("Campagin")}
            />
        </ScrollWrapper>
    )
}

export default MakeCampagin
