import { RankMember } from '@types'
import React from 'react'
import { View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { colorCode, Row, SubTitle, Text3, WhiteView } from '../../atoms'

interface Props {
    rankList: RankMember[]
}

const RankingList = (props: Props) => {
    return (
        <WhiteView style={{ marginTop: 10, alignItems: "center" }}>
            {
                props.rankList.map((v, idx) => (
                    <View key={idx} style={{ alignItems: "center", marginVertical: 10, paddingVertical: 5, width: "70%", borderWidth: 2, borderColor: colorCode.primary, borderRadius: 4 }}>
                        <SubTitle style={{ color: "white", position: "absolute", left: 0, backgroundColor: colorCode.primary, width: 20, height: 20, paddingLeft: 4 }}>
                            {v.rank}
                        </SubTitle>
                        <Avatar
                            source={{ uri: v.profileImg }}
                            size={'medium'}
                            rounded
                            containerStyle={{ marginVertical: 10 }}
                        />
                        <Row>
                            <SubTitle>{v.nickname}</SubTitle>
                            <Text3 style={{ color: colorCode.alert, marginBottom: 5 }}> {v.userId} </Text3>
                        </Row>
                        <Row>
                            <Text3>클리어한 핀포인트</Text3>
                            <Text3 style={{ fontWeight: "bold" }}> {v.cleared}개</Text3>
                        </Row>
                    </View>
                ))
            }
        </WhiteView>
    )
}

export default RankingList
