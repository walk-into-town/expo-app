import { Picker } from '@react-native-picker/picker'
import { quizType, TuseState } from '@types'
import React from 'react'
import { View } from 'react-native'
import { ButtonGroup, Input } from 'react-native-elements'
import { Box, SubTitle, EvilIcons, InputModal, OutLineButton } from '../../atoms'

interface Props {
    useQuizText: TuseState<string>,
    useType: TuseState<quizType>,
    useChoices: TuseState<string[]>,
    useAnswer: TuseState<string>,
    useSelectedAnswer: TuseState<string>,

}

const MakeQuiz = (props: Props) => {
    const [quizText, setQuizText] = props.useQuizText;
    const [type, setType] = props.useType;
    const [choices, setChoices] = props.useChoices;
    const [answer, setAnswer] = props.useAnswer;
    const [selectedAnswer, setSelectedAnswer] = props.useSelectedAnswer;

    const changeChoicesText = (text: string, idx: number) => {
        setChoices([...choices.map((e, i) => i === idx ? text : e)]);
    }
    const deleteChoices = (idx: number) => {
        setChoices([...choices.filter((_, i) => i !== idx)]);
    }

    return (
        <>
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
                    </Box>}
            </View>
        </>
    )
}

export default MakeQuiz
