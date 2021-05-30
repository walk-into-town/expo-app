import { PartedMember, TuseState } from '@types';
import React from 'react'
import { Avatar, Card, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { ClearButton, Text3, Title } from '../../atoms';

interface Props {
    useIsVisble: TuseState<boolean>
    usePartedUserList: TuseState<PartedMember[]>
}

const ParticiaptedUserModal = (props: Props) => {
    const [isVisible, setIsVisible] = props.useIsVisble
    const [partedUserList] = props.usePartedUserList

    return (
        <Modal isVisible={isVisible}>
            <Card>
                <Title>참여중인 유저 {partedUserList.length}명</Title>
                <ScrollView style={{ height: 300 }} bounces={false}>
                    {
                        partedUserList.map((v, idx) => (
                            <ListItem key={idx}>
                                <Avatar source={{ uri: v.profileImg }} rounded />
                                <ListItem.Content>
                                    <Text3 >
                                        {v.nickname}
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

export default ParticiaptedUserModal
