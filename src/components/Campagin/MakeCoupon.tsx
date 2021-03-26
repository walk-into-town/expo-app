
import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { Container } from '../../atoms/styled';
import { campaginNavigation, mainNavigation } from '../../navigation/useNavigation';

const MakeCoupon = () => {
    const campaginNav = campaginNavigation();
    const mainNav = mainNavigation();

    return (
        <Container>
            <Text>쿠폰 리스트</Text>
            <Button 
                title="쿠폰 추가"
                type="clear"
                onPress={() => mainNav.navigate("ModalStack", {screen: 'MakeCouponModal'})}
            />
            <Button
                title="캠페인 만들기"
                onPress={() => campaginNav.navigate("Campagin")}
            />
        </Container>
    )
}

export default MakeCoupon
