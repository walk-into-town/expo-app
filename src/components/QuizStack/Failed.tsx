import React, { useRef, useState } from 'react'
import { Animated, Image, Pressable } from 'react-native'
import { ClearButton, Container, Row } from '../../atoms'
import { mainNavigation } from '../../useHook'
import DialogBox from './DialogBox'

interface Props {
    monsterImg: string
}

const Failed = (props: Props) => {
    const TEXT = [
        "퀴즈가 좀 어려웠는가? 강해져서 오거라!",
        "크윽.. 분명 정답일줄 알았는데..",
        "동네를 다시 살펴보자. 분명 힌트가 있을거야! 3분 뒤에 다시 도전하자!!",
    ]
    const mainNav = mainNavigation();
    const navToMap = () => mainNav.navigate("HomeTab", { screen: "GameStack" })

    const [textIdx, setTextIdx] = useState(0)
    const nextText = () => {
        if (textIdx === 0)
            opacityAnimation();

        if (textIdx + 1 < TEXT.length)
            setTextIdx(textIdx + 1)
        else
            navToMap();
    }

    const opacity = useRef(new Animated.Value(1)).current;
    const opacityAnimation = (toValue = 0) => {
        Animated.timing(opacity, {
            toValue,
            duration: 300,
            useNativeDriver: true
        }).start();
    }

    return (
        <Container style={{ flex: 1, alignItems: 'center' }}>
            <Animated.View style={{ opacity }}>
                <Image
                    source={{ uri: props.monsterImg }}
                    style={{ width: 150, height: 150, marginVertical: 20 }}
                />
            </Animated.View>

            <Pressable onPress={nextText}>
                <DialogBox text={TEXT[textIdx]} />
            </Pressable>

            <Row style={{ position: "absolute", bottom: 15, right: 15 }}>
                <ClearButton
                    title="지도로 돌아가기"
                    color="black"
                    onPress={navToMap}
                />
                <ClearButton
                    title="AGAIN"
                    color="black"
                    onPress={() => { opacityAnimation(1); setTextIdx(0); }}
                />
            </Row>
        </Container>
    )
}

export default Failed
