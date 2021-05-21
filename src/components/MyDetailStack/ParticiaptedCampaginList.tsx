import { PlayingCampaign } from '@types'
import React from 'react'
import { View, Text } from 'react-native'
import { ListItem } from 'react-native-elements'
import { colorCode, SubTitle, Text1, Text3, TitleBadge } from '../../atoms'

interface Props {
    playingCampaignList: PlayingCampaign[]
}

const ParticiaptedCampaginList = (props: Props) => {
    return (
        <View>
            {
                props.playingCampaignList.map((v, idx) => (
                    <ListItem key={idx}>
                        <ListItem.Content>
                            <SubTitle>
                                {v.name} 
                                <TitleBadge title="clear" backgroundColor={colorCode.primary}/>
                            </SubTitle>
                            <Text3>{v.id}</Text3>
                            <Text1>{v.description}</Text1>
                            <Text1>핀포인트 리스트</Text1>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </View>
    )
}

export default ParticiaptedCampaginList
