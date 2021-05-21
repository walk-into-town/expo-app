import { Campaign, CampaignSearchCondition, CampaignSearchType, CampaignSearchTypeText, SearchCampaign, TuseState } from '@types'
import React, { useState } from 'react'
import { View } from 'react-native'
import { BadgeButton, Row, WhiteTitle } from '../../atoms'
import Modal from 'react-native-modal'
import { ScrollView } from 'react-native-gesture-handler'
import { getRatedAvg } from '../../util'

interface Props {
    useType: TuseState<CampaignSearchType>
    useCondition: TuseState<CampaignSearchCondition>
    useCampaignList: TuseState<SearchCampaign[]>
    reset: () => void
}

const CampaignSortFilter = (props: Props) => {
    const [type, setType] = props.useType;
    const [condition, setCondition] = props.useCondition;
    const [campaignList, setCampaignList] = props.useCampaignList;
    const [typeModalVisible, setTypeModalVIsible] = useState(false)
    const toggleTypeModal = () => setTypeModalVIsible(!typeModalVisible);

    // 검색 조건 설정
    const typeText: CampaignSearchTypeText = {
        'name': "캠페인 이름",
        'region': "지역",
        'id': "캠페인 ID",
        'owner': "제작유저"
    }
    const onSelectType = (type: string) => {
        setType(type as CampaignSearchType); // 편법.
        toggleTypeModal();
    }

    // 정렬 조건 설정
    const [filterIdx, setFilterIdx] = useState(0);
    const sortFilter = [
        '초기화',
        '핀포인트 많은 순',
        '쿠폰 많은 순',
        '별점 높은 순',
        '리뷰 많은 순'
    ]

    const filtering = (key: string) => {
        switch (key) {
            case '초기화':
                props.reset();
                return;
            case '핀포인트 많은 순':
                return campaignList.sort((a, b) => b.pinpoints.length - a.pinpoints.length);
            case '쿠폰 많은 순':
                return campaignList.sort((a, b) => b.coupons.length - a.coupons.length);
            case '별점 높은 순':
                return campaignList.sort((a, b) => getRatedAvg(b) - getRatedAvg(a))
            case '리뷰 많은 순':
                return campaignList.sort((a, b) => b.comments.length - a.comments.length)
            default:
                return;
        }
    }
    const onFilter = (idx: number) => {
        const newArr = filtering(sortFilter[idx]);
        if (newArr)
            setCampaignList([...newArr]);

        setFilterIdx(idx);
    }

    return (
        <View style={{ flexDirection: 'row', marginHorizontal: 10, marginBottom: 10 }}>
            <ScrollView horizontal>
                <BadgeButton title={`검색조건 - ${typeText[type]}`} onPress={toggleTypeModal} backgroundToggle />
                <Row style={{ marginLeft: 10 }}>
                    {
                        sortFilter.map((v, idx) => (
                            <View key={idx} style={{ marginHorizontal: 2 }}>
                                <BadgeButton title={v} onPress={() => onFilter(idx)} backgroundToggle={idx !== 0 && filterIdx === idx} />
                            </View>
                        ))
                    }
                </Row>
            </ScrollView>
            <Modal isVisible={typeModalVisible} avoidKeyboard animationIn={'pulse'} animationOut={'fadeOut'}>
                {Object.keys(typeText).map((v, idx) => {
                    return <WhiteTitle onPress={() => onSelectType(v)} key={idx}>{typeText[v]}</WhiteTitle>
                })}
            </Modal>
        </View>
    )
}

export default CampaignSortFilter
