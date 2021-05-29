import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler'
import Modal from 'react-native-modal';
import { BadgeButtonGroup, ClearButton, Row, SubTitle, Title } from '../../atoms';
import { useBackGroundSound } from '../../useHook';
import { useBGMContext } from '../../useHook/BGM';

import commingSoon from '../commingSoon'

interface PlaygroundProps {
    onLogout: () => void,
    navToCoupon: () => void,
    navToProfileEdit: () => void,
}
const Playground = (props: PlaygroundProps) => {
    const { playSound, stopSound } = useBGMContext()
    const [settingVisible, setSettingVisible] = useState(false)
    const toggleSetting = () => setSettingVisible(!settingVisible)
    // 0: 재생, 1: 정지
    const [onBgm, setOnBgm] = useState(0)

    return (
        <View style={{ backgroundColor: "white" }}>
            <View style={styled.Wrapper}>
                <ButtonBox title="설정" onPress={toggleSetting} />
                <Modal isVisible={settingVisible}>
                    <Card>
                        <Title>설정</Title>
                        <View style={{ marginVertical: 10, alignItems: "center" }}>
                            <BadgeButtonGroup
                                useFilterIdx={[onBgm, setOnBgm]}
                                buttons={[
                                    { name: "BGM 재생", func: playSound },
                                    { name: "정지", func: stopSound }
                                ]}
                            />
                        </View>
                        <ClearButton
                            title="닫기"
                            onPress={toggleSetting}
                        />
                    </Card>
                </Modal>
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
