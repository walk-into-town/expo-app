import { PinPoint } from '@types'
import React, { useState } from 'react'
import { View } from 'react-native'
import { Input, Button, Text, ButtonGroup } from 'react-native-elements'
import { OutLineButton, TextArea } from '../../atoms'
import ImgPicker from '../../atoms/ImgPicker'
import { Box, Row, ScrollWrapper, SubTitle } from '../../atoms/styled'
import Icon from 'react-native-vector-icons/EvilIcons';
import { mainNavigation } from '../../navigation/useNavigation'

import { Picker } from '@react-native-picker/picker';
import ModalSelector from 'react-native-modal-selector'

interface Props {

}

const MakePinPointModal = (props: Props) => {
    const mainNav = mainNavigation();

    const [pinPoint, setPinPoint] = useState<PinPoint>();
    const [title, setTitle] = useState(pinPoint?.name);
    const [pinPointImgs, setPinPointImgs] = useState<string[]>([]);

    const typeBts = ['단답식', '객관식']
    const [typeIndex, setTypeIndex] = useState<number>(0);
    const [choices, setChoices] = useState<string[]>([""]);
    const [answer, setAnswer] = useState<string>("");
    const [choicesAnswer, setChoicesAnswer] = useState<string>("");
    const [selectedLanguage, setSelectedLanguage] = useState();

    const changePinPointName = () => {
        if (pinPoint === undefined || title === undefined)
            return;
        setPinPoint({ ...pinPoint, name: title });
    }
    const changeChoicesText = (text: string, idx: number) => {
        setChoices([...choices.map((e, i) => i === idx ? text : e)]);
    }
    const deleteChoices = (idx:number) => {
        setChoices([...choices.filter((e, i) => i !== idx)]);
    }

    return (
        <ScrollWrapper>
            <Input
                onChangeText={(text: string) => setTitle(text)}
                placeholder="핀포인트명을 입력해주세요."
                style={{ marginTop: 20 }}
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
                    <Input placeholder="정답을 입력해주세요." onChangeText={text => setAnswer(text)} />
                </Box> : <Box>
                    <SubTitle>선택지</SubTitle>
                    {choices.map((choice, idx) => <Input
                        key={idx}
                        placeholder={`${idx + 1}번 선택지를 입력해주세요.`}
                        value={choice}
                        onChangeText={text => changeChoicesText(text, idx)}
                        rightIcon={<Icon name='close' size={24} onPress={() => deleteChoices(idx)}/>}
                    />)}
                    <OutLineButton title="선택지 추가" onPress={() => setChoices([...choices, ""])} />

                    <SubTitle style={{ marginVertical: 10 }}>정답</SubTitle>
                    <Picker
                        style={{marginVertical: 0}}
                        selectedValue={selectedLanguage}
                        onValueChange={itemValue => setSelectedLanguage(itemValue)}>
                        {choices.map((choice, idx) => <Picker.Item key={idx} label={`${choice}`} value={choice}/>)}
                    </Picker>
                    <ModalSelector
                        data={[...choices.map((e, i) => ({ key: i, label: e }))]}
                        initValue="정답지 선택"
                        cancelText="취소"
                        onChange={(option)=>{ setChoicesAnswer(option.label); }}
                    />
                </Box>}
            </View>

            

            <Button
                title="핀포인트 완료"
                onPress={() => mainNav.navigate('HomeTab')}
                style={{ marginBottom: 50 }} />
        </ScrollWrapper>
    )
}

export default MakePinPointModal
