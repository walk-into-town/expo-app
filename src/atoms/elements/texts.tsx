import { ITitleBadge } from '@types';
import React from 'react';
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