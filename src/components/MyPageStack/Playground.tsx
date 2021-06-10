import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler'
import Modal from 'react-native-modal';
import { BadgeButtonGroup, ClearButton, Text1, Title } from '../../atoms';
import { useAuthContext } from '../../useHook';
import { useBGMContext } from '../../useHook/BGM';

import commingSoon from '../commingSoon'

interface PlaygroundProps {
    onLogout: () => void,
    navToCoupon: () => void,
    navToProfileEdit: () => void,
    navToReport: () => void
}
const Playground = (props: PlaygroundProps) => {
    const { auth: { userToken }, useAuth: { setting } } = useAuthContext()
    if (userToken === undefined) return <></>

    const [settingVisible, setSettingVisible] = useState(false)
    const toggleSetting = () => setSettingVisible(!settingVisible)
    // 0: 재생, 1: 정지
    const [onBgm, setOnBgm] = useState(userToken.setting.playBGM ? 0 : 1)
    const [onDist, setOnDist] = useState(userToken.setting.useDist ? 0 : 1)

    const { playSound, stopSound } = useBGMContext()
    const onPlaySound = () => {
        setting({ playBGM: true });
        playSound();
    }
    const onStopSound = () => {
        setting({ playBGM: false })
        stopSound();
    }
    const onUseDist = () => setting({ useDist: true })
    const onNoDist = () => setting({ useDist: false })


    return (
        <View style={{ backgroundColor: "white" }}>
            <View style={styled.Wrapper}>
                <ButtonBox title="설정" onPress={toggleSetting} />
                <Modal isVisible={settingVisible} onBackdropPress={toggleSetting}>
                    <Card containerStyle={{ borderRadius: 10 }}>
                        <Title>설정</Title>
                        <View style={{ marginVertical: 4, alignItems: "center" }}>
                            <BadgeButtonGroup
                                useFilterIdx={[onBgm, setOnBgm]}
                                buttons={[
                                    { name: "BGM 재생", func: onPlaySound },
                                    { name: "정지", func: onStopSound }
                                ]}
                            />
                        </View>
                        <View style={{ marginVertical: 4, alignItems: "center" }}>
                            <BadgeButtonGroup
                                useFilterIdx={[onDist, setOnDist]}
                                buttons={[
                                    { name: "퀴즈 도전 거리 제한", func: onUseDist },
                                    { name: "무제한", func: onNoDist }
                                ]}
                            />
                            <Text1 style={{ marginVertical: 8 }}>* 개발모드로 임시 제공되는 기능입니다.</Text1>
                        </View>
                    </Card>
                </Modal>
                <ButtonBox title="프로필 편집" onPress={props.navToProfileEdit} />
                <ButtonBox title="쿠폰함" onPress={props.navToCoupon} />
            </View>
            <View style={styled.Wrapper}>
                <ButtonBox title="신고목록" onPress={props.navToReport} />
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
