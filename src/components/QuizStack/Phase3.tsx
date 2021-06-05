import React, { useEffect, useRef, useState } from 'react'
import { View, Image, Pressable, Animated } from 'react-native'
import { ClearButton, Row } from '../../atoms'
import { defeatAnimation, fadeAnimation } from '../../util'
import DialogBox from './DialogBox'

interface Props {
    monsterImg: string
    navToGameClear: () => void
}

const Phase3 = (props: Props) => {
    const TEXT = [
        "크윽.. 너 똑똑하구나..",
        "내 스스로 덫에 걸리는구나.. 허망하도다..",
        "무야호~~ 몬스터를 무찌질렀다!!",
        "전리품은 없으려나 🎶🎶"
    ]
    const [textIdx, setTextIdx] = useState(0)
    const nextText = () => {
        if (textIdx + 1 < TEXT.length)
            setTextIdx(textIdx + 1)
        else
            props.navToGameClear();
    }

    // animation
    const moster = useRef(new Animated.Value(0)).current;
    const mosterAnimation = () => defeatAnimation(moster, 15);
    const dialog = useRef(new Animated.Value(0)).current;
    const dialogAnimation = () => defeatAnimation(dialog, 30);

    const opacity = useRef(new Animated.Value(1)).current;
    const opacityAnimation = (toValue = 0) => fadeAnimation(opacity, toValue);

    useEffect(() => {
        if (textIdx === 0) {
            opacityAnimation(1);
            mosterAnimation();
        }
        else if (textIdx === 1)
            opacityAnimation();
        else if (textIdx === 2)
            dialogAnimation();
    }, [textIdx])

    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <Animated.View style={{ transform: [{ translateX: moster }], opacity }}>
                <Image
                    source={{ uri: props.monsterImg }}
                    style={{ width: 150, height: 150, marginVertical: 20 }}
                />
            </Animated.View>

            <Pressable onPress={nextText}>
                <Animated.View style={{ width: "100%", transform: [{ translateX: dialog }] }}>
                    <DialogBox text={TEXT[textIdx]} />
                </Animated.View>
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
                    onPress={props.navToGameClear}
                />
            </Row>
        </View>
    )
}

export default Phase3
