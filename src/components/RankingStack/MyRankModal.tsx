import { RankMember, TuseState } from '@types'
import React from 'react'
import { View } from 'react-native'
import { Card } from 'react-native-elements'
import Modal from 'react-native-modal'
import { ClearButton, SubTitle, Title } from '../../atoms'

interface Props {
    myRank: RankMember | undefined
    useVisible: TuseState<boolean>
}

const MyRankModal = (props: Props) => {
    const [isVisible, setIsVisible] = props.useVisible
    return (
        <Modal isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
            <Card wrapperStyle={{ alignItems: "center" }}>
                <SubTitle>내 랭크</SubTitle>
                {
                    props.myRank?.rank ?
                        <Title style={{ fontSize: 40 }}>{props.myRank.rank}</Title>
                        :
                        <SubTitle>등수가 보이지 않습니다...</SubTitle>

                }
                <ClearButton title="닫기" onPress={() => setIsVisible(false)} />
            </Card>
        </Modal>
    )
}

export default MyRankModal
