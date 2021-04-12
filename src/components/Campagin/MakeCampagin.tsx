import React, { useEffect, useState } from 'react'
import { campaginNavigation, mainNavigation } from '../../navigation/useNavigation';
import { PinPoint, CampaginStackParamList } from '@types';
import { Button, Input, Text } from 'react-native-elements'
import { SubTitle, ScrollWrapper, Box, Row } from '../../atoms/styled';
import ImgPicker from '../../atoms/ImgPicker';
import { OutLineButton, TextArea } from '../../atoms';
import { RouteProp, useRoute } from '@react-navigation/core';


const MakeCampagin = () => {
    const {params: {pinpoint}} = useRoute<RouteProp<CampaginStackParamList, 'MakeCampagin'>>();

    const mainNav = mainNavigation();
    const campaginNav = campaginNavigation();

    const [title, setTitle] = useState("");
    const [campaginImgs, setCampaginImgs] = useState<string[]>([]);
    const [depiction, setDepiction] = useState("");
    
    const [pinPointList, setPinPointList] = useState<PinPoint[]>([]);
    const [couponList, setCouponList] = useState([]);
    // react native multipart/form-data ajax

    useEffect(() => {
        if(pinpoint)
            setPinPointList([...pinPointList, pinpoint])
            
    }, [pinpoint])

    const submit = () => {
        
    }

    return (
        <ScrollWrapper>
            <Box>
                <Input
                    onChangeText={(text: string) => setTitle(text)}
                    placeholder="캠페인 이름"
                />
                <ImgPicker useImgs={[campaginImgs, setCampaginImgs]}/>

                <TextArea
                    onChangeText={(text: string) => setDepiction(text)}
                    placeholder="캠페인 설명"
                />

                <Input placeholder="지역 설정"/>
            </Box>

            <Box>
                <Row>
                    <SubTitle>핀포인트 리스트</SubTitle>
                    <Button type="clear" titleStyle={{fontSize: 13, color: "black"}} 
                        title="지도에서 보기" 
                        onPress={() => console.log("지도에서 보기")}/>
                </Row>
                {pinPointList.map((item, idx) => {
                    return <Text key={idx}>{item.name}</Text>
                })}
                <OutLineButton
                    title="핀포인트 추가"
                    onPress={() => mainNav.navigate("ModalStack", { screen: 'MakePinPointModal' })}
                />
            </Box>
            
            <Box>
                <SubTitle>쿠폰 리스트</SubTitle>
                <OutLineButton
                    title="쿠폰 추가"
                    onPress={() => mainNav.navigate("ModalStack", { screen: 'MakeCouponModal' })}
                />
            </Box>
            
            <Button
                title="캠페인 만들기"
                onPress={() => campaginNav.navigate("Campagin")}
                style={{marginTop: 20}}
            />
        </ScrollWrapper>
    )
}

export default MakeCampagin
