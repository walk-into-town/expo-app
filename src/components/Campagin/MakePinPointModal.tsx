import { PinPoint, CampaginStackParamList } from '@types'
import React, { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'
import { Input, Button, Text, ButtonGroup } from 'react-native-elements'
import { OutLineButton, TextArea } from '../../atoms'
import ImgPicker from '../../atoms/ImgPicker'
import { Box, Row, ScrollWrapper, SubTitle } from '../../atoms/styled'
import Icon from 'react-native-vector-icons/EvilIcons';
import { campaginNavigation } from '../../navigation/useNavigation'
import { Picker } from '@react-native-picker/picker';

const MakePinPointModal = () => {
    const campaginNav = campaginNavigation();

    const [title, setTitle] = useState("");
    const [latitude, setLatitude] = useState<number>(1.8);
    const [longitude, setLongitude] = useState<number>(19.9);
    const [pinPointImgs, setPinPointImgs] = useState<string[]>([]);

    const [quizText, setQuizText] = useState<string>("");
    const typeBts = ['단답식', '객관식']
    const [typeIndex, setTypeIndex] = useState<number>(0);
    const [choices, setChoices] = useState<string[]>([""]);
    const [answer, setAnswer] = useState<string>("");
    // const [choicesAnswer, setChoicesAnswer] = useState<string>("");
    const [selectedAnswer, setSelectedAnswer] = useState();


    const hasUnsavedChanges = Boolean(title);
    // 뒤로가기 방지
    // 두번 발생하는 버그....
    useEffect(() => {
        campaginNav.addListener('beforeRemove', (e) => {
            if (!hasUnsavedChanges) {
                return;
            }

            e.preventDefault();

            Alert.alert(
                '정말 취소하시겠어요?',
                '입력된 내용이 전부 사라집니다.',
                [
                    { text: "아니오", style: 'cancel', onPress: () => { } },
                    {
                        text: '취소합니다',
                        style: 'destructive',
                        onPress: () => campaginNav.dispatch(e.data.action),
                    },
                ]
            );
        }), [campaginNav, hasUnsavedChanges]
    })

    const changeChoicesText = (text: string, idx: number) => {
        setChoices([...choices.map((e, i) => i === idx ? text : e)]);
    }
    const deleteChoices = (idx: number) => {
        setChoices([...choices.filter((e, i) => i !== idx)]);
    }
    // 핀포인트 업로드
    const submit = () => {
        const pinpoint: PinPoint = {
            name: title,
            imgs: pinPointImgs,
            latitude,
            longitude,

            quiz: {
                text: quizText,
                type: typeIndex,
                choices,
                answer,
            }
        }
        // mainNav.navigate('HomeTab', { screen: "MakeCampagin", params: { pinpoint } });
        campaginNav.navigate('MakeCampagin', { pinpoint });
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
                <Text>위도 {latitude} 경도 {longitude}</Text>
            </Row>
            <ImgPicker useImgs={[pinPointImgs, setPinPointImgs]} />
            <TextArea placeholder="핀포인트 설명을 입력해주세요." />

            {/* 퀴즈 만들기 */}
            <SubTitle>퀴즈 만들기</SubTitle>
            <Input
                onChangeText={(text: string) => setQuizText(text)}
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
                </Box>
                    //  객관식 문제
                    : <Box>
                        <SubTitle>선택지</SubTitle>
                        {choices.map((choice, idx) => <Input
                            key={idx}
                            placeholder={`${idx + 1}번 선택지를 입력해주세요.`}
                            value={choice}
                            onChangeText={text => changeChoicesText(text, idx)}
                            rightIcon={<Icon name='close' size={24} onPress={() => deleteChoices(idx)} />}
                        />)}
                        <OutLineButton title="선택지 추가" onPress={() => setChoices([...choices, ""])} />

                        <SubTitle style={{ marginVertical: 10 }}>정답</SubTitle>
                        <Picker
                            style={{ marginVertical: 0 }}
                            selectedValue={selectedAnswer}
                            onValueChange={itemValue => setSelectedAnswer(itemValue)}>
                            {choices.map((choice, idx) => <Picker.Item key={idx} label={`${choice}`} value={choice} />)}
                        </Picker>

                        {/* 버그 발생..
                        <ModalSelector
                        data={[...choices.map((e, i) => ({ key: i, label: e }))]}
                        initValue="정답지 선택"
                        cancelText="취소"
                        onChange={(option)=>{ setChoicesAnswer(option.label); }}
                    /> */}
                    </Box>}
            </View>


            <Button
                title="핀포인트 완료"
                onPress={submit}
                style={{ marginBottom: 50 }} />
        </ScrollWrapper>
    )
}

export default MakePinPointModal
