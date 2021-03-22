import React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-elements';
import { Container } from '../../atoms/atoms';
import { campgainNavigation } from '../../navigation/useNavigation';

const MakePinPoint = () => {
    const navigation = campgainNavigation();
    return (
        <Container>
            <Text>핀포인트 리스트</Text>
            <Button 
                title="핀포인트 추가"
                type="clear"
            />
            <Button 
                title="다음"
                type="clear"
                onPress={() => navigation.navigate("MakeCoupon")}
            />
        </Container>
    )
}

export default MakePinPoint;
