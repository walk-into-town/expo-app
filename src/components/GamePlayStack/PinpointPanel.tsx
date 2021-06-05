import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SwipeablePanel } from 'rn-swipeable-panel'
import { PinPoint, SearchCampaign, TuseState } from '@types'
import { AbsoluteCousel, colorCode, Ionicons, Row, SubTitle, SwordIcon, Text3, Title } from '../../atoms';


interface Props {
    pinPoint: PinPoint | undefined,
    campaign: SearchCampaign | undefined
    clearedPinPointList: string[]
    usePanelActivie: TuseState<boolean>
    navtoPinPointDetail: (pinpoint: PinPoint) => void
    navtoQuiz: (pinpoint: PinPoint) => void
}

const PinPointPanel = ({ pinPoint, campaign, clearedPinPointList, usePanelActivie, navtoPinPointDetail, navtoQuiz }: Props) => {
    if (pinPoint === undefined || campaign === undefined) return <></>

    const [isPanelActive, setIsPanelActive] = usePanelActivie;

    const panelProps = {
        fullWidth: true,
        showCloseButton: false,
        onClose: () => setIsPanelActive(false),
        onlySmall: true,
        closeOnTouchOutside: true
    };

    const color = colorCode.primary;
    const disable = clearedPinPointList.includes(pinPoint.id)

    return (
        <SwipeablePanel {...panelProps} isActive={isPanelActive}>
            <View style={{ flex: 1 }}>

                <View style={{ margin: 20 }}>
                    <Text3 style={{ marginBottom: 2 }}>{campaign.name}</Text3>
                    <Title style={{ alignSelf: 'flex-start' }}>
                        {pinPoint.name}
                    </Title>
                    <SubTitle style={{ fontSize: 15 }}>
                        {pinPoint.description}
                    </SubTitle>
                </View>

                <View style={{ minHeight: 200, marginHorizontal: 10 }}>
                    <AbsoluteCousel
                        images={pinPoint.imgs}
                    />
                </View>

                <Row style={{ position: "absolute", bottom: 40, right: 10 }}>
                    <TouchableOpacity
                        onPress={() => navtoPinPointDetail(pinPoint)}
                        style={styles.ButtonCard}
                    >
                        <Ionicons name="ios-location-sharp" size={40} color={color} />
                        <SubTitle style={{ color }}>지역 정찰</SubTitle>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navtoQuiz(pinPoint)}
                        style={disable ? { ...styles.ButtonCard, opacity: .3 } : styles.ButtonCard}
                        disabled={disable}
                    >
                        <SwordIcon />
                        <SubTitle style={{ color }}>퀴즈 도전</SubTitle>
                    </TouchableOpacity>
                </Row>
            </View>
        </SwipeablePanel >
    )

}

export default PinPointPanel

const styles = StyleSheet.create({
    ButtonCard: {
        height: 87,
        borderWidth: 2,
        borderColor: colorCode.primary,
        borderRadius: 10,
        padding: 4,
        alignItems: "center",
        backgroundColor: "white",
        marginRight: 4
    },
})
