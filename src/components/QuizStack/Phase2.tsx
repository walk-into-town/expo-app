import { Quiz } from '@types'
import React, { useEffect, useState } from 'react'
import { View, Image, Animated, Pressable, LayoutAnimation } from 'react-native'
import { ClearButton, colorCode, Container, DefaultAlert, InputModal, SubmitButton, SubTitle, SwordIcon, Text1, Title } from '../../atoms'
import { mainNavigation, perventGoBack, useSubmit } from '../../useHook'

interface Props {
    monsterImg: string
    quiz: Quiz
    onAnswer: (answer: string) => void
    onFailed: () => void
}

const Phase2 = (props: Props) => {
    const { quiz } = props;
    const [timer, setTimer] = useState(60)
    const [input, setInput] = useState("")
    const [onTimer, setOnTimer] = useState(true)
    const [w, setW] = useState(100)
    const [h, setH] = useState(100)

    const onSword = () => {
        LayoutAnimation.spring()
        if (w < 175) {
            setW(w + 15)
            setH(h + 15)
        }
        else onSubmit();
    }

    // 타이머
    useEffect(() => {
        if (!onTimer) return;
        if (timer > 0) {
            setTimeout(() => setTimer(timer - 1), 1000)
        }
        else
            DefaultAlert({
                title: "제한시간을 초과하셨습니다.",
                onPress: props.onFailed
            })
    }, [timer])

    // render
    const color = () => {
        if (timer > 40) return colorCode.light
        if (timer > 30) return colorCode.sub
        if (timer > 20) return colorCode.primary
        if (timer > 10) return colorCode.alert
        return colorCode.appleRed
    }

    // 뒤로 가기 방지
    const { isSubmit, onSubmit } = useSubmit({
        submitFunc: async () => {
            setOnTimer(false)
            props.onAnswer(input)
        }
    })
    perventGoBack({ hasUnsavedChanges: !isSubmit, title: "정말 도전을 취소하시겠습니까?", subTitle: "3분간 다시 도전할 수 없습니다." })


    return (
        <Container style={{ flex: 1, alignItems: 'center' }}>
            <Animated.View >
                <Image
                    source={{ uri: props.monsterImg }}
                    style={{ width: w, height: h, marginVertical: 20 }}
                />
            </Animated.View>

            {/* <SubTitle style={{ color: color(), fontSize: 12 }}>{timer}</SubTitle> */}
            <View style={{ width: "90%", alignItems: "center" }}>
                <View style={{
                    borderColor: color(),
                    borderWidth: 4,
                    width: `${Math.floor(timer / 60 * 100)}%`
                }} />
            </View>

            <View style={{ marginTop: 50 }}>
                <Title>{quiz.text}</Title>
            </View>
            {quiz.type === "주관식" ?
                <InputModal
                    useText={[input, setInput]}
                    placeholder="정답을 입력해주세요."
                />
                :
                quiz.choices.map((v, idx) => (
                    <ClearButton
                        key={idx}
                        title={v}
                        onPress={() => setInput(idx.toString())}
                    />
                ))
            }


            <Pressable onPress={onSword}>
                <SwordIcon />
            </Pressable>
            <Text1 style={{ marginTop: 10, color: colorCode.alert }}>정답을 입력하고 몬스터를 처치해주세요!</Text1>

        </Container>
    )
}

export default Phase2
