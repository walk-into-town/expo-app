import { PinPoint } from '@types';
import React, { useState } from 'react'
import { Button, Text } from 'react-native-elements';
import { NextButton } from '../../atoms';
import { Container } from '../../atoms/styled';
import { campaginNavigation, mainNavigation } from '../../navigation/useNavigation';

const MakePinPoint = () => {
    const campaginNav = campaginNavigation();
    const mainNav = mainNavigation();

    const [pinPointList, setPinPointList] = useState<PinPoint[]>([]);

    return (
        <Container>
            <Text>핀포인트 리스트</Text>
            <Button 
                title="핀포인트 추가"
                type="clear"
                onPress={() => mainNav.navigate("ModalStack", {screen: 'MakePinPointModal'})}
            />
            <NextButton onPress={() => campaginNav.navigate("MakeCoupon")}/>
        </Container>
    )
}

export default MakePinPoint;
