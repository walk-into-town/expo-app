
import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { campgainNavigation } from '../../navigation/CampaginStack';

const MakeCoupon = () => {
    const navigation = campgainNavigation();
    return (
        <View>
            <Text>쿠폰 리스트</Text>
            <Button 
                title="쿠폰 추가"
                type="clear"
            />
            <Button
                title="캠페인 만들기"
                onPress={() => navigation.navigate("Campagin")}
            />
        </View>
    )
}

export default MakeCoupon
