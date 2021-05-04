import { Campagin, SearchCampagin } from '@types'
import React from 'react'

import { ListItem, Text } from 'react-native-elements'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { Row, ScrollWrapper, TitleBadge } from '../../atoms'
import { getDateAfter, isBlank, isUndefined } from '../../util'
//  https://github.com/kohver/react-native-touchable-scale

interface Props {
    campaginList: SearchCampagin[]
}

const CampaginCard = ({ campagin }: { campagin: SearchCampagin }) => {
    const uri = campagin.imgs.length ? campagin.imgs[0] : "https://pgnqdrjultom1827145.cdn.ntruss.com/img/1d/07/1d0703352c93061e01f2df12715bc04b7fa152f6d509113c1d6b67794219c595_v1.jpg";
    const badgeList: string[] = [];
    if (new Date(campagin.updateTime) < getDateAfter(30))
        badgeList.push("신규");

    const getCommentsNum = (): string => {
        const len = campagin.comments ? campagin.comments.length : 0
        return len > 100 ? `(100+)` : `(${len})`
    }

    const getLineTrd = (): string => {
        var res = `핀포인트 ${campagin.pinpoints.length}개`;
        if (campagin.coupons.length)
            res += `, 쿠폰 ${campagin.coupons.length}개`;
        return res;
    }

    return (
        <ListItem bottomDivider onLongPress={() => console.log("캠페인 ID: ", campagin.id)}>
            <Avatar source={{ uri }} size={'large'} title='이미지 로딩중' />
            <ListItem.Content>
                <Row style={{ marginVertical: 2 }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{campagin.name}</Text>
                    {badgeList.map((v, i) => <TitleBadge key={i} title={v} backgroundColor={'#ff3b30'} />)}
                </Row>
                <ListItem.Subtitle style={{ fontSize: 13, marginVertical: 2 }}>
                    ✨ <Text style={{ fontWeight: 'bold' }}>4.8</Text> {getCommentsNum()}
                </ListItem.Subtitle>
                <ListItem.Subtitle style={{ fontSize: 13, marginVertical: 2 }}>
                    {getLineTrd()}
                </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    )
}

const CampaginList = ({ campaginList }: Props) => {
    return (
        <ScrollWrapper>
            {
                campaginList.map((campagin, idx) =>
                    <CampaginCard key={idx} campagin={campagin} />
                )
            }
        </ScrollWrapper>
    )
}
export default CampaginList;
