import React from 'react'
import { View, Text } from 'react-native'
import { ClearButton, colorCode, Title, WhiteView } from '../../atoms'

interface Props {
    onModal: () => void
}

const RankHeader = (props: Props) => {
    return (
        <WhiteView style={{ marginTop: 10, paddingTop: 30 }}>
            <Title style={{ color: colorCode.primary, position: "absolute", top: "50%" }}>
                랭크
            </Title>
            <ClearButton
                title="내 랭킹 조회하기"
                onPress={props.onModal}
                size={14} style={{ marginLeft: "auto" }}
            />
            <View style={{ backgroundColor: colorCode.primary, height: 4 }} />
        </WhiteView>
    )
}

export default RankHeader
