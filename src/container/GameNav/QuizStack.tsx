import { RouteProp, useIsFocused, useRoute } from '@react-navigation/core'
import { GameNavParamList, QuizClear } from '@types'
import React, { useEffect, useState } from 'react'
import { API } from '../../api'
import { DefaultAlert } from '../../atoms'
import { Failed, Phase1, Phase2, Phase3 } from '../../components/QuizStack'
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
    const [QuizClear, setQuizClear] = useState<QuizClear>()

    // 몬스터 이미지
    useEffect(() => {
        const init = async () => {
            const { result, data, error, errdesc } = await API.monsterRead()
            if (result === "failed" || data === undefined)
                return DefaultAlert({ title: error, subTitle: errdesc })

            console.log(data)
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
    const onAnswer = async (answer: string) => {
        const { result, data, error, errdesc } = await API.quizSolve({ caid, pid, answer })
        if (result === "failed" || data === undefined) {
            console.log(`[퀴즈 실패] ${error} ${errdesc}`)
            return false;
        }
        setQuizClear(data);
        nextPhase();
        return true;
    }

    const nextPhase = () => setPhase(phase + 1)
    const onFailed = () => setPhase(-1)
    const navToGameClear = () => {
        if (QuizClear)
            mainNav.navigate("GameNav", { screen: "GameClear", params: { QuizClear } })
    }


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
                navToGameClear={navToGameClear}
            />
        default:
            return <Failed monsterImg={monsterImg} />
    }
}

export default QuizStack