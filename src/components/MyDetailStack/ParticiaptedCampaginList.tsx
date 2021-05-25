import { PlayingCampaign } from '@types'
import React from 'react'
import { View, Text } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { colorCode, Row, SubTitle, Text1, Text3, TitleBadge } from '../../atoms'
import { mainNavigation } from '../../useHook'
import { getDummySearchCampaign } from '../../util'

interface Props {
    playingCampaignList: PlayingCampaign[]
}

const ParticiaptedCampaginList = (props: Props) => {
    const nav = mainNavigation();
    const navToCampaignDetail = (id: string) => {
        nav.navigate('ModalNav', { screen: 'CampaignDetailStack', params: { campaign: getDummySearchCampaign(id) } })
    }
    return (
        <ScrollView>
            {
                props.playingCampaignList.map((v, idx) => (
                    <ListItem key={idx}>
                        { v.imgs.length > 0 && <Avatar source={{ uri: v.imgs[0] }} />}
                        <ListItem.Content>
                            <Row>
                                <SubTitle>
                                    {v.name}
                                </SubTitle>
                                <View style={{ marginBottom: 5 }}>
                                    {v.cleared && <TitleBadge title="clear" backgroundColor={colorCode.primary} />}
                                </View>
                            </Row>
                            <Text1>{v.id}</Text1>
                            <Text3>{v.description}</Text3>
                            <Text1>클리어한 핀포인트 리스트</Text1>
                        </ListItem.Content>
                        <ListItem.Chevron onPress={() => navToCampaignDetail(v.id)}/>
                    </ListItem>
                ))
            }
        </ScrollView >
    )
}

export default ParticiaptedCampaginList
