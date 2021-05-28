import React, { useRef } from 'react'
import { View, Dimensions, Image } from 'react-native'
import ConfettiCannon from 'react-native-confetti-cannon';
import LottieView from "lottie-react-native";
import { ClearButton, Container, SubTitle, Title } from '../../atoms';
import { animationPath } from '../../util';
import { Card } from 'react-native-elements';
import { mainNavigation } from '../../useHook';

interface Props {

}

const ClearCampaignStack = (props: Props) => {
    const mainNav = mainNavigation();
    const Confetti = useRef<ConfettiCannon>(null);

    const pageWidth = Math.round(Dimensions.get('window').width);
    const onConfetti = () => Confetti.current?.start();

    const navToMyCouponStack = () => {
        mainNav.navigate("HomeTab", { screen: "MyPageStack" })
        mainNav.navigate("ModalNav", { screen: "MyCouponStack" })
    }

    return (
        <Container style={{ alignItems: "center" }}>

            <View>
                <LottieView
                    source={animationPath.celebrationGiraffe}
                    autoPlay
                    loop
                    style={{ height: 220 }}
                />
            </View>

            <Title>축하드립니다!</Title>
            <Title>퀴즈의 정답을 맞췄습니다</Title>
            <Card wrapperStyle={{ alignItems: "center" }}>
                <SubTitle>지급되는 쿠폰 정보</SubTitle>
                <ClearButton
                    title="내 쿠폰함 확인하러 가기 "
                    onPress={navToMyCouponStack}
                />
            </Card>

            <ClearButton
                title="다시 축하 받기"
                onPress={onConfetti}
            />
            <ConfettiCannon
                count={200}
                origin={{ x: pageWidth / 2, y: 0 }}
                fadeOut
                ref={Confetti}
            />
        </Container>
    )
}

export default ClearCampaignStack
