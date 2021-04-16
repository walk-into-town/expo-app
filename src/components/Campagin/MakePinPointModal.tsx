import React, { useEffect, useState } from 'react'
import { PinPoint, ModalStackParamList, quizType } from '@types'
import { campaginNavigation } from '../../navigation/useNavigation'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'

import { ImageStore, View } from 'react-native'
import { Input, Button, Text, ButtonGroup } from 'react-native-elements'
import { OutLineButton, EvilIcons, ImgPicker, InputModal, ClearButton } from '../../atoms'
import { Box, Row, ScrollWrapper, SubTitle } from '../../atoms/styled'
import { Picker } from '@react-native-picker/picker';
import perventGoBack from '../../api/perventGoBack'
import { isEditPinPoint } from '../../api/util'

const MakePinPointModal = () => {
    const campaginNav = campaginNavigation();
    const nav = useNavigation();

    const { params: { pinpoint, editIndex } } = useRoute<RouteProp<ModalStackParamList, 'MakePinPointModal'>>();

    const [name, setName] = useState("");
    const [latitude, setLatitude] = useState<number>(1.8);
    const [longitude, setLongitude] = useState<number>(19.9);
    const [description, setDescription] = useState("")
    const [pinPointImgs, setPinPointImgs] = useState<string[]>([]);

    const [quizText, setQuizText] = useState<string>("");
    const [type, setType] = useState<quizType>("주관식");
    const [choices, setChoices] = useState<string[]>([""]);
    const [answer, setAnswer] = useState<string>("");
    // const [choicesAnswer, setChoicesAnswer] = useState<string>("");
    const [selectedAnswer, setSelectedAnswer] = useState("");

    useEffect(() => {
        if (pinpoint === undefined) return;

        if (editIndex !== undefined) nav.setOptions({ headerTitle: "핀포인트 수정하기" })

        setName(pinpoint.name);
        setLatitude(pinpoint.latitude);
        setLongitude(pinpoint.longitude);
        setDescription(pinpoint.description);

        setQuizText(pinpoint.quiz.text);
        setType(pinpoint.quiz.type);
        setChoices(pinpoint.quiz.choices);
        if (pinpoint.quiz.type === '주관식')
            setAnswer(pinpoint.quiz.answer);
        else
            setSelectedAnswer(pinpoint.quiz.answer);

    }, [pinpoint])

    const changeChoicesText = (text: string, idx: number) => {
        setChoices([...choices.map((e, i) => i === idx ? text : e)]);
    }
    const deleteChoices = (idx: number) => {
        setChoices([...choices.filter((e, i) => i !== idx)]);
    }
    // 핀포인트 업로드
    const getPinpoint: () => PinPoint = () => {
        return {
            name,
            imgs: pinPointImgs,
            latitude,
            longitude,
            description,

            quiz: {
                text: quizText,
                type: type,
                choices,
                answer: type === '주관식' ? answer : selectedAnswer,
            }
        }
    }
    const submit = () => {
        const pinpoint: PinPoint = getPinpoint();
        campaginNav.navigate('MakeCampagin', { pinpoint, editIndex });
    }

    // const hasUnsavedChanges = Boolean(pinpoint === undefined ? name : isEditPinPoint(pinpoint, getPinpoint()));
    const hasUnsavedChanges = Boolean(pinpoint ? isEditPinPoint(pinpoint, getPinpoint())
        : name || pinPointImgs.length || description || quizText || answer);
    perventGoBack({ hasUnsavedChanges })

    return (
        <ScrollWrapper>
            <InputModal
                useText={[name, setName]}
                placeholder="핀포인트명을 입력해주세요" />

            <Row>
                <ClearButton
                    title="위치찾기"
                    onPress={() => console.log('위치 찾기 api 연동')} />
                <Text>위도 {latitude} 경도 {longitude}</Text>
            </Row>
            <ImgPicker useImgs={[pinPointImgs, setPinPointImgs]} />

            <InputModal
                useText={[description, setDescription]}
                placeholder="핀포인트 설명을 입력해주세요."
                type="textarea" />

            {/* 퀴즈 만들기 */}
            <InputModal
                useText={[quizText, setQuizText]}
                placeholder="퀴즈 질문을 입력해주세요" />

            <View style={{ margin: 10 }}>
                <ButtonGroup
                    onPress={() => setType(type === '주관식' ? '객관식' : '주관식')}
                    selectedIndex={type === '주관식' ? 0 : 1}
                    buttons={["주관식", "객관식"]}
                    textStyle={{ fontSize: 15, fontFamily: "SCDream5" }}
                // selectedButtonStyle={{backgroundColor: "#333D79"}}
                />
                {type === '주관식' ?
                    <InputModal
                        useText={[answer, setAnswer]}
                        placeholder="주관식 정답"
                        textFontSize={17} />
                    //  객관식 문제
                    : <Box>
                        <SubTitle>선택지</SubTitle>
                        {choices.map((choice, idx) => <Input
                            key={idx}
                            placeholder={`${idx + 1}번 선택지를 입력해주세요.`}
                            value={choice}
                            onChangeText={text => changeChoicesText(text, idx)}
                            rightIcon={<EvilIcons name='close' size={24} onPress={() => deleteChoices(idx)} />}
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
                style={{ marginBottom: 50 }}
                titleStyle={{ fontFamily: "SCDream7" }} />
        </ScrollWrapper>
    )
}

export default MakePinPointModal
