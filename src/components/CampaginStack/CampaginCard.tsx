import { ITitleBadge, SearchCampagin } from '@types';
import React from 'react'
import { Text } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements';
import { Row, TitleBadge } from '../../atoms';
import { mainNavigation } from '../../navigation/useNavigation';
import { getDateAfter } from '../../util';

interface Props {
    campagin: SearchCampagin
}

const CampaginCard = ({ campagin }: Props) => {
    const mainNav = mainNavigation();

    const uri = campagin.imgs.length ? campagin.imgs[0] : "https://pgnqdrjultom1827145.cdn.ntruss.com/img/1d/07/1d0703352c93061e01f2df12715bc04b7fa152f6d509113c1d6b67794219c595_v1.jpg";

    const badgeList: ITitleBadge[] = [];
    if (new Date(campagin.updateTime) < getDateAfter(30))
        badgeList.push({ title: "신규", backgroundColor: "#ff3b30" });

    const getCommentsNum = (): string => {
        const len = campagin.comments ? campagin.comments.length : 0
        return len > 100 ? `(100+)` : `(${len})`
    }

    const getLineTrd = (): string => {
        var res = `핀포인트 ${campagin.pinpoints.length}개`;
        if (campagin.coupons.length)
            res += `, 지급 쿠폰 ${campagin.coupons.length}개`;
        return res;
    }

    const navToCampaginDetail = () => {
        mainNav.navigate("ModalNav", {
            screen: 'CampaginDetailStack',
            params: { campagin }
        })
    }

    return (
        <ListItem
            bottomDivider
            onPress={navToCampaginDetail}
            onLongPress={() => console.log("캠페인 ID: ", campagin.id)}
        >
            <Avatar source={{ uri }} size={'large'} title='이미지 로딩중' />

            <ListItem.Content>
                <Row style={{ marginVertical: 2 }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{campagin.name}</Text>
                    {badgeList.map((v, i) => <TitleBadge
                        key={i}
                        title={v.title}
                        backgroundColor={v.backgroundColor}
                    />)}
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

export default CampaginCard
