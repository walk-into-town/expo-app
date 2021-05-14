import { Picker } from '@react-native-picker/picker'
import { PinPoint, TuseState } from '@types'
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { SubTitle } from '../../atoms'

interface Props {
    pinPointList?: PinPoint[]
    usePaymentCondition: TuseState<number>
}

const PaymentConditionPicker = ({ pinPointList = [], usePaymentCondition }: Props) => {
    const [paymentCondition, setPaymentCondition] = usePaymentCondition;

    return (
        <View style={{ marginTop: 20 }}>
            <SubTitle>쿠폰 지급 조건</SubTitle>
            <Text>해당 캠페인 / 핀포인트 클리어시</Text>
            <Picker
                selectedValue={paymentCondition}
                onValueChange={(itemValue, itemIndex) =>
                    setPaymentCondition(itemValue)
                }>
                <Picker.Item label="캠페인 클리어시" key={-1} value={-1} />
                {pinPointList.map((v, idx) => <Picker.Item
                    label={v.name}
                    value={idx}
                    key={idx}
                />)}
            </Picker>
        </View>
    )
}

export default PaymentConditionPicker
