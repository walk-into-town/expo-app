import React, { useRef } from 'react'
import { View, Dimensions } from 'react-native'
import ConfettiCannon from 'react-native-confetti-cannon';
import LottieView from "lottie-react-native";
import { ClearButton, Container, Row, SubTitle, Text3, Title } from '../../atoms';
import { animationPath } from '../../util';
import { Card, ListItem } from 'react-native-elements';
import { mainNavigation } from '../../useHook';
import { RouteProp, useRoute } from '@react-navigation/core';
import { GameNavParamList } from '@types';


const GameClear = () => {
    const mainNav = mainNavigation();
    const { params: { QuizClear } } = useRoute<RouteProp<GameNavParamList, "GameClear">>();
    console.log(QuizClear)

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
            <Title>{QuizClear.isClear ? "캠페인을 클리어 했습니다" : "퀴즈의 정답을 맞췄습니다"}</Title>
            <Card wrapperStyle={{ alignItems: "center" }} containerStyle={{ width: "80%" }}>
                {
                    QuizClear.coupons.length === 0 ?
                        <SubTitle>지급되는 쿠폰은 없습니다</SubTitle>
                        : <>
                            <SubTitle>지급되는 쿠폰 정보</SubTitle>
                            {
                                QuizClear.coupons.map((v, idx) => (
                                    <ListItem key={idx}>
                                        {/* <Avatar source={{ uri: resCoupon.imgs }} /> */}
                                        <ListItem.Content>
                                            <SubTitle>{v.name}</SubTitle>
                                            <SubTitle>{v.goods}</SubTitle>
                                        </ListItem.Content>
                                    </ListItem>
                                ))

                            }
                            <ClearButton
                                title="내 쿠폰함 확인하러 가기 "
                                onPress={navToMyCouponStack}
                            />
                        </>

                }
            </Card>

            <Row style={{ position: "absolute", bottom: 30, right: 30 }}>
                <ClearButton
                    title="다시 축하 받기"
                    onPress={onConfetti}
                    size={15}
                    color="black"

                />
                <ClearButton
                    title="지도로 돌아가기"
                    onPress={() => mainNav.navigate("HomeTab", { screen: "GameStack" })}
                    size={15}
                    color="black"
                />
            </Row>
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
