import { RankMember } from '@types'
import React from 'react'
import { Avatar, ListItem } from 'react-native-elements'
import { colorCode, SubTitle, Text1, Text3, WhiteView } from '../../atoms'

interface Props {
    outRankList: RankMember[]
}

const OutRankingList = (props: Props) => {
    return (
        <WhiteView style={{ marginTop: 10, paddingVertical: 10 }}>
            <SubTitle style={{ color: colorCode.primary, alignSelf: "center" }}>순위밖 랭크</SubTitle>
            {
                props.outRankList.map((v, idx) => (
                    <ListItem key={idx} style={{ marginLeft: "25%" }}>
                        <Avatar
                            source={{ uri: v.profileImg }}
                            rounded
                            containerStyle={{ marginVertical: 10 }}
                        />
                        <ListItem.Content>
                            <Text3>{v.nickname} <Text1 style={{ color: colorCode.alert }}>{v.userId}</Text1></Text3>
                            <Text3>클리어한 캠페인 {v.cleared}개</Text3>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </WhiteView>
    )
}

export default OutRankingList
