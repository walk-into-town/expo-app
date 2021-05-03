import { Campagin } from '@types'
import React from 'react'
import { View, Text } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import styled from 'styled-components/native'
//  https://github.com/kohver/react-native-touchable-scale

interface Props {
    campaginList: Campagin[]
}

const CampaginCard = ({ campagin }: { campagin: Campagin }) => {
    return (
        <ListItem>
            <Avatar source={{ uri: campagin.imgs[0] }} />
            <ListItem.Content>
                <ListItem.Title>
                    {campagin.name}
                </ListItem.Title>
                <ListItem.Subtitle>
                    핀포인트 수: {campagin.pinpoints.length}
                </ListItem.Subtitle>
                <ListItem.Subtitle>
                    쿠폰 수: {campagin.coupons.length}
                </ListItem.Subtitle>
                <ListItem.Subtitle>
                    {campagin.updateTime}
                </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron color="white" />
        </ListItem>
    )
}

const CampaginList = ({ campaginList }: Props) => {
    return (
        <Wrapper>
            { campaginList.map((campagin, idx) => {
                <CampaginCard key={idx} campagin={campagin} />
            })}
        </Wrapper>
    )
}

const Wrapper = styled.View`
    padding-top: 10%;
`

export default CampaginList;
