import { PinPoint } from '@types'
import React, { useState } from 'react'
import { Input, Button } from 'react-native-elements'
import { TextArea } from '../../atoms'
import ImgPicker from '../../atoms/ImgPicker'
import {  Container } from '../../atoms/styled'
import { modalNavigation } from '../../navigation/useNavigation'

interface Props {

}

const MakePinPointModal = (props: Props) => {
    const modalNav = modalNavigation();
    const [pinPoint, setPinPoint] = useState<PinPoint>();

    const [title, setTitle] = useState(pinPoint?.name)

    const changePinPointName = () => {
        if(pinPoint === undefined || title === undefined)
            return;
        setPinPoint({...pinPoint, name: title});
    }
    return (
        <Container>
            <Input
                onChangeText={(text: string) => setTitle(text)}
                inputStyle={{ textAlign: "center" }}
                placeholder="핀포인트 이름"
            />
            <Button 
                type="clear"title="위치찾기" onPress={() => console.log('위치 찾기 api 연동')} />
            <ImgPicker />

            <TextArea placeholder="핀포인트 설명" />

            <Button 
                type="clear"title="다음" onPress={() => modalNav.navigate('MakePinPointQuiz')} />
        </Container>
    )
}

export default MakePinPointModal
