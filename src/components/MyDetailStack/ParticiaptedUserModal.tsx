import { PartedMember, TuseState } from '@types';
import React from 'react'
import { Avatar, Card, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { ClearButton, Text1, Text3, Title } from '../../atoms';

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
                <Text1 style={{ alignSelf: "flex-end", marginRight: 70 }}>
                    클리어한 유저 {partedUserList.reduce((ac, v) => v.cleared ? ac + 1 : ac, 0)}명
                </Text1>
                <ScrollView style={{ height: 300 }} bounces={false}>
                    {
                        partedUserList.map((v, idx) => (
                            <ListItem key={idx}>
                                <Avatar source={{ uri: v.profileImg }} rounded />
                                <ListItem.Content>
                                    <Text3 style={{ fontSize: 13, marginBottom: 4 }}>{v.nickname}</Text3>
                                    <Text3>진척 {v.clearedPinpoints.length} / {v.pinpoints.length}</Text3>
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
