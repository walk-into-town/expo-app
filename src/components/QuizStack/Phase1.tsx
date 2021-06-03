import React, { useState } from 'react'
import { View, Image, Pressable } from 'react-native'
import { ClearButton, colorCode, Ionicons, Row, TextAnimator } from '../../atoms'
import { imgPath } from '../../util'
import DialogBox from './DialogBox'

interface Props {
    monsterImg: string
    nextPhase: () => void
}

const Phase1 = (props: Props) => {
    const TEXT = [
        "나의 이름은 오박사! 너의 모험에 도움을 주도록 하지!",
        "악의 세력 [GTP-2]가 몬스터를 생성해 동네를 어지럽히고 있다.",
        "정답을 입력하고 아래 공격 버튼을 마구 마구 누르면 된다네!",
        "3분 내로 퀴즈를 맞춰야 할게다. 참을성이 부족한 녀석들이거든..",
        "정답이 틀려도 그리 걱정말게 몬스터가 기다려 줄 때까지 계속 도전할 수 있을게다!",
        "그럼 건투를 빈다.."
    ]
    const [textIdx, setTextIdx] = useState(0)
    const nextText = () => {
        if (textIdx + 1 < TEXT.length)
            setTextIdx(textIdx + 1)
        else
            props.nextPhase();
    }

    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{ marginVertical: 20 }}>
                <Image source={imgPath.pr_ork} style={{ width: 200, height: 200 }} />
            </View>

            <Pressable onPress={nextText}>
                <DialogBox text={TEXT[textIdx]} />
            </Pressable>

            <Row style={{ position: "absolute", bottom: 15, right: 15 }}>
                <ClearButton
                    title="AGAIN"
                    color="black"
                    onPress={() => setTextIdx(0)}
                />
                <ClearButton
                    title="SKIP"
                    color="black"
                    onPress={props.nextPhase}
                />
            </Row>
        </View>
    )
}

export default Phase1
