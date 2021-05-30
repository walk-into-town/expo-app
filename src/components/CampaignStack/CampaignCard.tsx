import { ITitleBadge, SearchCampaign } from '@types';
import React from 'react'
import { Text, View } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements';
import { colorCode, RateStarIcon, Row, TitleBadge } from '../../atoms';
import { mainNavigation } from '../../useHook';
import { getDateAfter, getRatedAvg } from '../../util';

interface Props {
    campaign: SearchCampaign
}

const CampaignCard = ({ campaign }: Props) => {
    const DEFUALT_IMG = `https://ppid.blorakab.go.id/packages/tugumuda/portal/img/default-square.jpg`
    const mainNav = mainNavigation();

    const navToCampaignDetail = () => {
        mainNav.navigate("ModalNav", {
            screen: 'CampaignDetailStack',
            params: { campaign: campaign }
        })
    }

    // render
    const uri = campaign.imgs.length ? campaign.imgs[0] : DEFUALT_IMG;

    const badgeList: ITitleBadge[] = [];
    if (new Date(campaign.updateTime) < getDateAfter(30))
        badgeList.push({ title: "신규", backgroundColor: colorCode.primary });

    const getCommentsNum = (): string => {
        const len = campaign.comments ? campaign.comments.length : 0
        return len > 100 ? `(100+)` : `(${len})`
    }

    const getLineTrd = (): string => {
        var res = `핀포인트 ${campaign.pinpoints.length}개`;
        if (campaign.coupons.length)
            res += `, 지급 쿠폰 ${campaign.coupons.length}개`;
        return res;
    }

    return (
        <ListItem
            bottomDivider
            onPress={navToCampaignDetail}
            onLongPress={() => console.log("캠페인 ID: ", campaign.id)}
        >
            <Avatar source={{ uri }} size={'large'} avatarStyle={{ borderRadius: 10 }} />

            <ListItem.Content>
                <Row style={{ marginVertical: 2 }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{campaign.name}</Text>
                    {badgeList.map((v, i) => <TitleBadge
                        key={i}
                        title={v.title}
                        backgroundColor={v.backgroundColor}
                    />)}
                </Row>

                <Row style={{ marginVertical: 2 }}>
                    <RateStarIcon toggle />
                    <Text style={{ fontSize: 13, fontWeight: 'bold', marginLeft: 4 }}>
                        {getRatedAvg(campaign).toFixed(1)}
                    </Text>
                    <Text style={{ fontSize: 13 }}>
                        {getCommentsNum()}
                    </Text>
                </Row>

                <ListItem.Subtitle style={{ fontSize: 13, marginVertical: 2 }}>
                    {getLineTrd()}
                </ListItem.Subtitle>
            </ListItem.Content>

            <ListItem.Chevron />
        </ListItem>
    )
}

export default CampaignCard
