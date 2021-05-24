import { MyCampaign } from '@types'
import React from 'react'
import { View, Text } from 'react-native'
import { Divider, ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { BadgeButton, Row, SubTitle, Text1, Text3 } from '../../atoms'

interface Props {
    myCampaignList: MyCampaign[]
}

const MakedCampaignList = (props: Props) => {
    return (
        <View>
            <Row style={{ marginLeft: 10, marginBottom: 10 }}>
                <BadgeButton title="참여중인 유저 정보" onPress={() => { }} />
            </Row>

            <ScrollView style={{ height: "100%" }}>
                {
                    props.myCampaignList.map((v, idx) => (
                        <View key={idx}>
                            <ListItem topDivider>
                                <ListItem.Content>
                                    <SubTitle>{v.name}</SubTitle>
                                    <Text3>{v.id}</Text3>
                                    <Text1>{v.description}</Text1>
                                </ListItem.Content>
                            </ListItem>
                            <ListItem bottomDivider>
                                <Text>편집</Text>
                                <Text>삭제</Text>
                            </ListItem>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    )
}

export default MakedCampaignList
