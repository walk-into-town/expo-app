import React, { useRef } from 'react'
import { View, Dimensions, Image } from 'react-native'
import ConfettiCannon from 'react-native-confetti-cannon';
import LottieView from "lottie-react-native";
import { ClearButton, colorCode, Container, SubTitle, Title } from '../../atoms';
import { animationPath } from '../../util';
import { Avatar, Card, ListItem } from 'react-native-elements';
import { mainNavigation } from '../../useHook';
import { RouteProp, useRoute } from '@react-navigation/core';
import { GameNavParamList } from '@types';

interface Props {

}

const GameClear = (props: Props) => {
    const mainNav = mainNavigation();
    const { params: { resCoupon } } = useRoute<RouteProp<GameNavParamList, "GameClear">>();
    const Confetti = useRef<ConfettiCannon>(null);

    const pageWidth = Math.round(Dimensions.get('window').width);
    const pageHight = Math.round(Dimensions.get('window').height);
    const onConfetti = () => Confetti.current?.start();

    const navToMyCouponStack = () => {
        mainNav.navigate("HomeTab", { screen: "MyPageStack" })
        mainNav.navigate("ModalNav", { screen: "MyCouponStack" })
    }

    return (
        <Container style={{ alignItems: "center" }}>
            {/* Confetti */}
            <View style={{ position: "absolute" }}>
                <LottieView
                    source={animationPath.confetti}
                    autoPlay
                    loop
                    style={{ height: pageHight }}
                />
            </View>

            {/* Main */}
            <LottieView
                source={animationPath.chilling}
                autoPlay
                loop
                style={{ width: 270 }}
            />
            <Title style={{ marginTop: 0 }}>축하드립니다!</Title>
            <Title>퀴즈의 정답을 맞췄습니다</Title>
            <Card wrapperStyle={{ alignItems: "center" }}>
                <SubTitle>지급되는 쿠폰 정보</SubTitle>
                <ListItem>
                    {/* <Avatar source={{ uri: resCoupon.imgs }} /> */}
                    <ListItem.Content>
                        <SubTitle>{resCoupon.name}</SubTitle>
                        <SubTitle>{resCoupon.goods}</SubTitle>
                    </ListItem.Content>
                </ListItem>

                <ClearButton
                    title="내 쿠폰함 확인하러 가기 "
                    onPress={navToMyCouponStack}
                />
            </Card>

            <ClearButton
                title="다시 축하 받기"
                onPress={onConfetti}
                size={15}
                color={colorCode.sub}
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

export default GameClear
