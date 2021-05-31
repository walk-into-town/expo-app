import { RouteProp, useIsFocused, useRoute } from '@react-navigation/core'
import { GameNavParamList } from '@types'
import React, { useEffect, useState } from 'react'
import { Animated, Image } from 'react-native'
import { API } from '../../api'
import { Container, DefaultAlert, Title } from '../../atoms'
import { Phase1, Phase2 } from '../../components/QuizStack'
import { mainNavigation, useBGMContext, useSound } from '../../useHook'


const QuizStack = () => {
    const DUMMY_MOSTER = "http://asq.kr/XKdRm";
    const { params: { caid, pid, quiz } } = useRoute<RouteProp<GameNavParamList, "QuizStack">>()
    const { playSound: playBGM, stopSound: stopBGM } = useBGMContext();
    const { playSound, stopSound } = useSound()
    const isFocused = useIsFocused()
    const mainNav = mainNavigation()

    const [phase, setPhase] = useState(1)
    const [monsterImg, setMonsterImg] = useState<string>(DUMMY_MOSTER)

    // 몬스터 이미지
    useEffect(() => {
        const init = async () => {
            const { result, data, error, errdesc } = await API.monsterRead()
            if (result === "failed" || data === undefined)
                return DefaultAlert({ title: error, subTitle: errdesc })

            setMonsterImg(data);
        }
        init();
    }, [])

    useEffect(() => {
        if (isFocused) {
            stopBGM()
            playSound()
        }
        else {
            stopSound()
            playBGM()
        }
    }, [isFocused])

    // usecase
    const onAnswer = (answer: string) => {
        const init = async () => {
            const { result, data, error, errdesc } = await API.quizCheck({ caid, pid, answer })
            if (result === "failed" || data === undefined)
                return DefaultAlert({ title: errdesc, onPress: onFailed })

            mainNav.navigate("GameNav", { screen: "GameClear", params: { resCoupon: data } })
        }
        init();
    }

    const nextPhase = () => setPhase(phase + 1)
    const onFailed = () => setPhase(-1)

    // render
    switch (phase) {
        case 1:
            return <Phase1
                monsterImg={monsterImg}
                nextPhase={nextPhase}
            />
        case 2:
            return <Phase2
                quiz={quiz}
                monsterImg={monsterImg}
                onAnswer={onAnswer}
                onFailed={onFailed}
            />
        default:
            return <Container style={{ flex: 1, alignItems: 'center' }}>
                <Animated.View>
                    <Image
                        source={{ uri: monsterImg }}
                        style={{ width: 150, height: 150, marginVertical: 20 }}
                    />
                </Animated.View>
                <Title>퀴즈에 실패하셨군요</Title>
            </Container>
    }
}

export default QuizStack