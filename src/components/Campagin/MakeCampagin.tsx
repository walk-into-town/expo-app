import React, { useState } from 'react'
import { Text } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Container } from '../../atoms/styled';
import ImgPicker from '../../atoms/ImgPicker';
import { campaginNavigation, mainNavigation } from '../../navigation/useNavigation';
import { PinPoint } from '@types';


const MakeCampagin = () => {
    const mainNav = mainNavigation();
    const campaginNav = campaginNavigation();

    const [pinPointList, setPinPointList] = useState<PinPoint[]>([]);
    
    const [title, setTitle] = useState("");
    const [depiction, setDepiction] = useState("");

    return (
        <Container>
            <Input
                onChangeText={(text: string) => setTitle(text)}
                inputStyle={{ textAlign: "center" }}
                placeholder="캠페인 이름"
            />

            <ImgPicker />
            
            <Input
                onChangeText={(text: string) => setDepiction(text)}
                multiline
                numberOfLines={4}
                inputStyle={{ textAlign: "center" }}
                placeholder="캠페인 설명"
            />
            <Text>{title} {depiction}</Text>


            <Text>핀포인트 리스트</Text>
            <Button
                title="핀포인트 추가"
                type="clear"
                onPress={() => mainNav.navigate("ModalStack", {screen: 'MakePinPointModal'})}
            />


            <Text>쿠폰 리스트</Text>
            <Button 
                title="쿠폰 추가"
                type="clear"
                onPress={() => mainNav.navigate("ModalStack", {screen: 'MakeCouponModal'})}
            />
            <Button
                title="캠페인 만들기"
                onPress={() => campaginNav.navigate("Campagin")}
            />
        </Container>
    )
}

export default MakeCampagin
