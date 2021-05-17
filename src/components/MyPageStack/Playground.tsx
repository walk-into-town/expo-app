import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import commingSoon from '../commingSoon'

interface PlaygroundProps {
    onLogout: () => void,
    navToCoupon: () => void,
    navToProfileEdit: () => void,
}
const Playground = (props: PlaygroundProps) => {
    return (
        <View style={{ backgroundColor: "white" }}>
            <View style={styled.Wrapper}>
                <ButtonBox title="설정" onPress={commingSoon} />
                <ButtonBox title="프로필 편집" onPress={props.navToProfileEdit} />
                <ButtonBox title="쿠폰함" onPress={props.navToCoupon} />
            </View>
            <View style={styled.Wrapper}>
                <ButtonBox title="도전기록" onPress={commingSoon} />
                <ButtonBox title="리뷰관리" onPress={commingSoon} />
                <ButtonBox title="로그아웃" onPress={props.onLogout} />
            </View>
        </View>
    )
}

interface ButtonBoxProps {
    title: string,
    onPress: () => void
}
const ButtonBox = ({ title, onPress }: ButtonBoxProps) => {
    return (
        <View style={styled.Box}>
            <TouchableOpacity onPress={() => onPress()}>
                <View style={styled.CenterMaker}>
                    <Text style={styled.Text}>
                        {title}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styled = StyleSheet.create({
    Wrapper: {
        height: 70, flexDirection: "row"
    },
    Box: {
        flex: 1, borderWidth: .3, borderColor: "#ececec"
    },
    CenterMaker: {
        width: "100%", height: "100%", justifyContent: "center"
    },
    Text: {
        fontFamily: "SCDream5", fontSize: 13, textAlign: "center"
    }
})

export default Playground
