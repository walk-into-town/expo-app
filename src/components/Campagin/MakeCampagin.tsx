import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Container } from '../../atoms/styled';
import ImgPicker from '../../atoms/ImgPicker';
import { campaginNavigation } from '../../navigation/useNavigation';


const MakeCampagin = () => {
    const navigation = campaginNavigation();
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
            <Button 
                title="다음"
                type="clear"
                onPress={() => navigation.navigate("MakePinPoint")}
            />
        </Container>
    )
}

export default MakeCampagin
