import { MyCampaign } from '@types'
import React from 'react'
import { View, Text } from 'react-native'
import { ListItem } from 'react-native-elements'
import { SubTitle, Text1, Text3 } from '../../atoms'

interface Props {
    myCampaignList: MyCampaign[]
}

const MakedCampaignList = (props: Props) => {
    return (
        <View>
            {
                props.myCampaignList.map((v, idx) => (
                    <ListItem key={idx}>
                        <ListItem.Content>
                            <SubTitle>{v.name}</SubTitle>
                            <Text3>{v.id}</Text3>
                            <Text1>{v.description}</Text1>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </View>
    )
}

export default MakedCampaignList
