import { RouteProp, useRoute } from '@react-navigation/core';
import { ModalStackParamList } from '@types';
import React, { useState } from 'react'
import { Text } from 'react-native'
import { ButtonTabs, Container, OutLineButton } from '../../atoms';
import CouponListTab from '../../components/CampaginDetailStack/CouponListTab';
import PinPointListTab from '../../components/CampaginDetailStack/PinPointListTab';

const CampaginDetailStack = () => {
    const { params: { campagin } } = useRoute<RouteProp<ModalStackParamList, 'CampaginDetailStack'>>();

    const [value, setValue] = useState(0);

    return (
        <Container>
            <Text>{campagin.id}</Text>
            <Text>{campagin.name}</Text>
            <Text>{campagin.description}</Text>
            <Text>{campagin.updateTime}</Text>
            <Text>{campagin.region}</Text>

            <OutLineButton title="캠페인 참여하기" />

            <ButtonTabs
                selectedIndex={value}
                onPress={setValue}
                buttons={["핀포인트 리스트", "쿠폰 리스트"]}
                viewList={[<PinPointListTab />, <CouponListTab />]}
            />

            <Text>{campagin.comments}</Text>

        </Container>
    )
}

export default CampaginDetailStack
