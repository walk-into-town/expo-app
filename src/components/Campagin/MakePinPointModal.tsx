import { PinPoint } from '@types'
import React, { useState } from 'react'
import { Input, Button } from 'react-native-elements'
import { TextArea } from '../../atoms'
import ImgPicker from '../../atoms/ImgPicker'
import {  Container } from '../../atoms/styled'
import { mainNavigation, modalNavigation } from '../../navigation/useNavigation'

interface Props {

}

const MakePinPointModal = (props: Props) => {
    const mainNav = mainNavigation();

    const [pinPoint, setPinPoint] = useState<PinPoint>();
    const [title, setTitle] = useState(pinPoint?.name);
    const [pinPointImgs, setPinPointImgs] = useState<string[]>([]);

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
                
            <ImgPicker useImgs={[pinPointImgs, setPinPointImgs]}/>

            <TextArea placeholder="핀포인트 설명" />

            <Button title="핀포인트 완료" onPress={() => mainNav.navigate('HomeTab')} />

        </Container>
    )
}

export default MakePinPointModal
