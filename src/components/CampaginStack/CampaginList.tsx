import { Campagin } from '@types'
import React from 'react'
import { ListItem } from 'react-native-elements'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import styled from 'styled-components/native'
import { isBlank } from '../../util'
//  https://github.com/kohver/react-native-touchable-scale

interface Props {
    campaginList: Campagin[]
}

const CampaginCard = ({ campagin }: { campagin: Campagin }) => {
    const getDefaultImg = (uri: string) => {
        return !isBlank([uri]) ? uri : "https://pgnqdrjultom1827145.cdn.ntruss.com/img/1d/07/1d0703352c93061e01f2df12715bc04b7fa152f6d509113c1d6b67794219c595_v1.jpg";
    }
    return (
        <ListItem>
            <Avatar source={{ uri: getDefaultImg(campagin.imgs[0]) }} />
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
            <ListItem.Chevron />
        </ListItem>
    )
}

const CampaginList = ({ campaginList }: Props) => {
    return (
        <Wrapper>
            {
                campaginList.map((campagin, idx) =>
                    <CampaginCard key={idx} campagin={campagin} />
                )
            }
        </Wrapper>
    )
}

const Wrapper = styled.View`
    padding-top: 10%;
`

export default CampaginList;
