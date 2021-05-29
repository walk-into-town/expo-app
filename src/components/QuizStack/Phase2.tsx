import { Quiz } from '@types'
import React, { useEffect, useState } from 'react'
import { View, Image, Animated } from 'react-native'
import { ClearButton, colorCode, Container, DefaultAlert, InputModal, SubTitle, Text3, Title } from '../../atoms'
import { mainNavigation } from '../../useHook'

interface Props {
    monsterImg: string
    quiz: Quiz
    onAnswer: (answer: string) => void
    nextPhase: () => void
    onFailed: () => void
}

const Phase2 = (props: Props) => {
    const mainNav = mainNavigation()

    const { quiz } = props;
    const [timer, setTimer] = useState(60)
    const [input, setInput] = useState("")
    const [onTimer, setOnTimer] = useState(true)

    // 타이머
    useEffect(() => {
        if (!onTimer)
            return;
        if (timer > 0)
            setTimeout(() => setTimer(timer - 1), 1000)
        else
            DefaultAlert({
                title: "제한시간을 초과하셨습니다.",
                onPress: props.onFailed
            })
    }, [timer])

    const color = () => {
        if (timer > 40) return colorCode.light
        if (timer > 30) return colorCode.sub
        if (timer > 20) return colorCode.primary
        if (timer > 10) return colorCode.alert
        return colorCode.appleRed
    }

    return (
        <Container style={{ flex: 1, alignItems: 'center' }}>
            <Animated.View>
                <Image
                    source={{ uri: props.monsterImg }}
                    style={{ width: 150, height: 150, marginVertical: 20 }}
                />
            </Animated.View>

            <SubTitle style={{ color: color() }}>{timer}</SubTitle>
            <View style={{
                marginHorizontal: 10,
                borderColor: color(),
                borderWidth: 4,
                width: `${Math.floor(timer / 60 * 100)}%`
            }} />

            <SubTitle>{quiz.text}</SubTitle>
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
                        onPress={() => props.onAnswer(idx.toString())}
                    />
                ))
            }
            <ClearButton
                title="제출"
                onPress={() => props.onAnswer(input)}
            />
        </Container>
    )
}

export default Phase2
