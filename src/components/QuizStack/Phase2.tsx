import { Quiz } from '@types'
import React, { useEffect, useRef, useState } from 'react'
import { View, Image, Animated, Pressable, LayoutAnimation, Easing } from 'react-native'
import { ClearButton, colorCode, Container, InputModal, renderColor, SwordIcon, Text1, Title } from '../../atoms'
import { perventGoBack, useSubmit } from '../../useHook'
import DialogBox from './DialogBox'
import { shakeAnimation } from '../../util'

interface Props {
    monsterImg: string
    quiz: Quiz
    onAnswer: (answer: string) => Promise<boolean>
    onFailed: () => void
}

const Phase2 = (props: Props) => {
    const LIMIT_TIME = 180;
    const DEFAULT_W = 100, DEFAULT_H = 100;
    const MAX_W = 160;

    const { quiz } = props;
    const [timer, setTimer] = useState(LIMIT_TIME)
    const [input, setInput] = useState("")
    const [onTimer, setOnTimer] = useState(true)
    const [message, setMessage] = useState("도전을 환영한다!! 크하하하")
    const [w, setW] = useState(DEFAULT_W)
    const [h, setH] = useState(DEFAULT_H)
    const [shakeDuration, setShakeDuration] = useState(1000)

    const getPercentage = () => timer / LIMIT_TIME * 100;

    // animation
    const progress = useRef(new Animated.Value(0)).current;
    const progressAnimation = () => {
        Animated.timing(progress, {
            toValue: timer / LIMIT_TIME,
            duration: 1000,
            easing: Easing.bounce,
            useNativeDriver: true
        }).start();
    }

    const shakeX = useRef(new Animated.Value(0)).current;
    const shakeY = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        shakeAnimation(shakeX)
        shakeAnimation(shakeY)
    }, [])

    // 타이머
    useEffect(() => {
        let timeout = 0;
        if (getPercentage() < 20)
            setMessage("이제 나에게 참을성이 부족하구나!!")

        if (onTimer) {
            progressAnimation()
            if (timer > 0) timeout = setTimeout(() => setTimer(timer - 1), 1000)
            else props.onFailed()
        }
        return () => clearTimeout(timeout)
    }, [timer])


    // useCase
    const onSword = () => {
        LayoutAnimation.spring()
        if (w >= 115) {
            setMessage("도전하는 게냐?! 마음 준비 더 확실히 해야할 것이다 ㅎㅎㅎ")
        }
        if (w < MAX_W) {
            setW(w + 15)
            setH(h + 15)
        }
        else onSubmit();
    }

    // 뒤로 가기 방지
    const { isSubmit, onSubmit } = useSubmit({
        submitFunc: async () => {
            setOnTimer(false)
            console.log("[정답 시도]: " + input)
            const isAnswer = await props.onAnswer(input)
            if (!isAnswer) {
                setOnTimer(true)
                setTimer(timer - 30);
                setMessage("정답이 아니라네! 크하하하하하하")
                setW(DEFAULT_W)
                setH(DEFAULT_H)
            }
        }
    })
    perventGoBack({ hasUnsavedChanges: !isSubmit, title: "정말 도전을 취소하시겠습니까?", subTitle: "3분간 다시 도전할 수 없습니다." })


    return (
        <Container style={{ flex: 1 }}>
            <View style={{ alignItems: "center", marginTop: 30 }}>
                <Animated.View style={{
                    zIndex: 999,
                    transform: [
                        { translateX: shakeX },
                        { translateY: shakeY },
                        { rotateY: '60deg' },
                        { perspective: 1000 },
                    ]
                }}>
                    <Image
                        source={{ uri: props.monsterImg }}
                        style={{ width: w, height: h }}
                    />
                </Animated.View>

                <View style={{ marginBottom: 20, width: "80%", alignItems: "center" }}>
                    <Animated.View style={[
                        { borderColor: renderColor(getPercentage()), borderWidth: 4, borderRadius: 10, width: "100%" },
                        { transform: [{ scaleX: progress }] }
                    ]} />
                </View>

                <DialogBox text={message} />
            </View>

            {/* <SubTitle style={{ color: color(), fontSize: 12 }}>{timer}</SubTitle> */}


            <View style={{ marginTop: "auto" }}>
                <Title>{quiz.text}</Title>
                {quiz.type === "주관식" ?
                    <InputModal
                        useText={[input, setInput]}
                        placeholder="________________________"
                    />
                    :
                    quiz.choices.map((v, idx) => (
                        <ClearButton
                            key={idx}
                            title={v}
                            onPress={() => setInput(v)}
                        />
                    ))
                }

                <View style={{ marginBottom: 50, marginTop: 10, alignItems: "center" }}>
                    <Pressable onPress={onSword} style={{
                        borderWidth: 3, borderColor: colorCode.primary, borderRadius: 20,
                        padding: 7,
                        width: "70%",
                        flexDirection: "row",
                    }}>
                        {/* 총 5번 클릭시 정답 제출 */}
                        <View style={{
                            position: "absolute",
                            backgroundColor: colorCode.primary,
                            left: 0, right: 0, top: 65 - (h - DEFAULT_H), bottom: 0, borderRadius: 17,
                            borderTopStartRadius: 5, borderTopEndRadius: 5
                        }} />
                        <SwordIcon />
                    </Pressable>
                    <Text1 style={{ marginTop: 10, color: colorCode.alert }}>정답을 입력하고 몬스터를 처치해주세요!</Text1>
                </View>
            </View>
        </Container>
    )
}

export default Phase2
