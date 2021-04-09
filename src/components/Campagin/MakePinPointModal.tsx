import { PinPoint } from '@types'
import React, { useState } from 'react'
import { View } from 'react-native'
import { Input, Button, Text, ButtonGroup } from 'react-native-elements'
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox'
import { OutLineButton, SubmitButton, TextArea } from '../../atoms'
import ImgPicker from '../../atoms/ImgPicker'
import { Box, Container, Row, ScrollWrapper, SubTitle } from '../../atoms/styled'
import { mainNavigation } from '../../navigation/useNavigation'

interface Props {

}

const MakePinPointModal = (props: Props) => {
    const mainNav = mainNavigation();

    const [pinPoint, setPinPoint] = useState<PinPoint>();
    const [title, setTitle] = useState(pinPoint?.name);
    const [pinPointImgs, setPinPointImgs] = useState<string[]>([]);

    const typeBts = ['단답식', '객관식']
    const [typeIndex, setTypeIndex] = useState<number>(0);
    const [choices, setChoices] = useState<string[]>(["asdf"]);
    const [answer, setAnswer] = useState<string>("");

    const changePinPointName = () => {
        if (pinPoint === undefined || title === undefined)
            return;
        setPinPoint({ ...pinPoint, name: title });
    }
    const changeChoicesText = (text: string, idx: number) => {
        setChoices([...choices.map((e,i) => i === idx ? text : e)]);
    }

    return (
        <ScrollWrapper>
            <Input
                onChangeText={(text: string) => setTitle(text)}
                placeholder="핀포인트명을 입력해주세요."
            />
            <Row>
                <Button
                    type="clear"
                    title="위치찾기"
                    onPress={() => console.log('위치 찾기 api 연동')} />
                <Text>위도 경도</Text>
            </Row>
            <ImgPicker useImgs={[pinPointImgs, setPinPointImgs]} />
            <TextArea placeholder="핀포인트 설명을 입력해주세요." />

            <SubTitle>퀴즈 만들기</SubTitle>
            <Input
                onChangeText={(text: string) => setTitle(text)}
                placeholder="퀴즈 제목"
            />

            <View style={{ margin: 10 }}>
                <ButtonGroup
                    onPress={setTypeIndex}
                    selectedIndex={typeIndex}
                    buttons={typeBts}
                    textStyle={{ fontSize: 15 }}
                // selectedButtonStyle={{backgroundColor: "#333D79"}}
                />
                {typeIndex === 0 ? <Box>
                    <SubTitle>정답</SubTitle>
                    <Input placeholder="정답을 입력해주세요."/>
                </Box> : <Box>
                    <SubTitle>선택지</SubTitle>
                    {choices.map((choice, idx) => <Input 
                        key={idx} 
                        placeholder={`${idx+1}번 선택지를 입력해주세요.`}
                        value={choice}
                        onChangeText={text => changeChoicesText(text, idx)}
                    />)}
                    <OutLineButton title="선택지 추가" onPress={() => setChoices([...choices, ""])}/>

                    <SubTitle style={{marginVertical: 10}}>정답</SubTitle>

                </Box>}
            </View>


            <Button 
                title="핀포인트 완료" 
                onPress={() => mainNav.navigate('HomeTab')} 
                style={{marginBottom: 100}}/>
        </ScrollWrapper>
    )
}

export default MakePinPointModal
