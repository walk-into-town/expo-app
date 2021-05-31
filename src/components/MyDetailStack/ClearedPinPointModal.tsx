import { TuseState } from '@types'
import React from 'react'
import { Avatar, Card, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { ClearButton, Text3, Title } from '../../atoms';

interface Props {
    useIsVisble: TuseState<boolean>
    pinpointList: string[]
}

const ClearedPinPointModal = (props: Props) => {
    const [isVisible, setIsVisible] = props.useIsVisble

    return (
        <Modal isVisible={isVisible}>
            <Card>
                <Title>클리어한 핀포인트 {props.pinpointList.length}개</Title>
                <ScrollView style={{ height: 300 }} bounces={false}>
                    {
                        props.pinpointList.map((v, idx) => (
                            <ListItem key={idx}>
                                <ListItem.Content>
                                    <Text3>
                                        {v}
                                    </Text3>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        ))
                    }
                </ScrollView>
                <ClearButton title="닫기" onPress={() => setIsVisible(false)} />
            </Card>
        </Modal>
    )
}

export default ClearedPinPointModal
