import { RouteProp, useRoute } from '@react-navigation/core'
import { GameNavParamList } from '@types'
import React, { useEffect, useState } from 'react'
import { Animated, Image, View } from 'react-native'
import { API } from '../../api'
import { ClearButton, colorCode, Container, DefaultAlert, InputModal, ScrollWrapper, SubTitle, Title } from '../../atoms'
import { Phase1, Phase2, Phase3 } from '../../components/QuizStack'
import { mainNavigation } from '../../useHook'

interface Props {

}

const QuizStack = (props: Props) => {
    const DUMMY_MOSTER = "http://asq.kr/XKdRm";
    const { params: { caid, pid, quiz } } = useRoute<RouteProp<GameNavParamList, "QuizStack">>()
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

    // usecase
    const onAnswer = (answer: string) => {
        const init = async () => {
            const { result, data, error, errdesc } = await API.quizCheck({ caid, pid, answer })
            if (result === "failed" || data === undefined)
                DefaultAlert({ title: errdesc, onPress: onFailed })

            nextPhase();
        }
        init();
    }

    const nextPhase = () => setPhase(phase + 1)
    const onFailed = () => setPhase(-1)
    const navToClearPinpoint = () => mainNav.navigate("GameNav", { screen: "GameClear" })

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
                nextPhase={nextPhase}
            />
        case 3:
            return <Phase3
                monsterImg={monsterImg}

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