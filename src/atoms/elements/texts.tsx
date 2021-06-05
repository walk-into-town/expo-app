import { ITitleBadge } from '@types';
import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { Text } from "react-native-elements";
import styled from "styled-components/native";

export const Title = styled.Text`
    font-family: "SCDream8";
    font-size: 22px;
    margin-bottom: 10px;
    align-self: center;
`

export const SubTitle = styled.Text`
    font-family: "SCDream7";
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
`
export const Text3 = styled.Text`
    font-family: "SCDream3";
    font-size: 12px;
`
export const Text1 = styled.Text`
    font-family: "SCDream1";
    font-size: 12px;
`
export const Bold = styled.Text`
    font-weight: bold;
`
export const Gray = styled.Text`
    color: gray;
    font-size: 12px;
`

export const WhiteTitle = styled.Text`
    font-family: "SCDream9";
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 20px;
    color: white;
`

export const WhiteSubTitle = styled.Text`
    font-family: "SCDream7";
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
    color: white;
`

export const WhiteText = styled.Text`
    font-family: "SCDream3";
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 5px;
    margin-left: 5px;
    color: white;
`


export const TitleBadge = (props: ITitleBadge) => {
    return (
        <Text style={{
            fontSize: 11,
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: props.backgroundColor,
            borderRadius: 9,
            overflow: "hidden",
            marginLeft: 4,
            paddingHorizontal: 5,
            paddingVertical: 3,
        }}>
            {props.title}
        </Text>
    )
}

export const TextAnimator = ({ text }: { text: string }) => {
    const textArr = text.trim().split(" ")
    // 최대 단어 100개..
    const animatedValues = useRef([...Array(100)].map(_ => new Animated.Value(0))).current;

    const animateTypeText = (toValue = 1) => {
        const animations = textArr.map((_, i) => (
            Animated.timing(animatedValues[i], {
                toValue,
                duration: 300,
                useNativeDriver: true
            })
        ))
        Animated.stagger(100, animations).start()
    }

    useEffect(() => {
        animatedValues.forEach((_, idx) => animatedValues[idx].setValue(0))
        animateTypeText()
    }, [text])


    return (
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {
                textArr.map((word, idx) => (
                    <Animated.Text key={idx} style={[{}, { opacity: animatedValues[idx] }]} >
                        <SubTitle>
                            {word}
                            {`${idx < textArr.length ? " " : ""}`}
                        </SubTitle>
                    </Animated.Text>
                ))
            }
        </View >
    )
}