import { BadgeButtonGroupButtonsProps, Campaign, CampaignSearchCondition, CampaignSearchType, CampaignSearchTypeText, SearchCampaign, TuseState } from '@types'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { BadgeButton, Row, WhiteTitle } from '../../atoms'
import Modal from 'react-native-modal'
import { ScrollView } from 'react-native-gesture-handler'
import { getRatedAvg } from '../../util'
import BadgeButtonGroup from '../../atoms/BadgeButtonGroup'

interface Props {
    useType: TuseState<CampaignSearchType>
    useCondition: TuseState<CampaignSearchCondition>
    useCampaignList: TuseState<SearchCampaign[]>
    refreshing: boolean
    reset: () => void
}

const CampaignSortFilter = (props: Props) => {
    const [type, setType] = props.useType;
    const [campaignList, setCampaignList] = props.useCampaignList;
    const [typeModalVisible, setTypeModalVisible] = useState(false)
    const toggleTypeModal = () => setTypeModalVisible(!typeModalVisible);

    // 검색 조건 설정
    const typeText: CampaignSearchTypeText = {
        'name': "캠페인 이름",
        'region': "지역",
        'id': "캠페인 ID",
        'ownner': "제작유저"
    }
    const onSelectType = (type: string) => {
        setType(type as CampaignSearchType); // 편법.
        toggleTypeModal();
    }

    // 정렬 조건 설정
    const [filterIdx, setFilterIdx] = useState(0);
    const filterButton: BadgeButtonGroupButtonsProps[] = [
        { name: "최신 순", func: () => onFilter((a, b) => new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime()) },
        { name: "핀포인트 많은 순", func: () => onFilter((a, b) => b.pinpoints.length - a.pinpoints.length) },
        { name: "쿠폰 많은 순", func: () => onFilter((a, b) => b.coupons.length + b.pcoupons.length - a.coupons.length - a.pcoupons.length) },
        { name: "별점 높은 순", func: () => onFilter((a, b) => getRatedAvg(b) - getRatedAvg(a)) },
        { name: "리뷰 많은 순", func: () => onFilter((a, b) => b.comments.length - a.comments.length) },
    ]
    const onFilter = (func: (a: SearchCampaign, b: SearchCampaign) => number) => {
        const newArr = campaignList.sort(func);
        setCampaignList([...newArr]);
    }
    useEffect(() => {
        // 리프레쉬하면 다시 필터잉
        if (props.refreshing === false)
            filterButton[filterIdx].func();

    }, [props.refreshing])

    return (
        <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Row style={{ marginRight: 8 }}>
                    <BadgeButton title={`검색조건 - ${typeText[type]}`} onPress={toggleTypeModal} backgroundToggle />
                    <BadgeButton title={`초기화`} onPress={props.reset} option={{ style: { marginLeft: 4 } }} />
                </Row>
                <BadgeButtonGroup
                    buttons={filterButton}
                    useFilterIdx={[filterIdx, setFilterIdx]}
                />
            </ScrollView>
            <Modal isVisible={typeModalVisible} onBackdropPress={() => setTypeModalVisible(false)} avoidKeyboard animationIn={'pulse'} animationOut={'fadeOut'}>
                {Object.keys(typeText).map((v, idx) => {
                    return <WhiteTitle onPress={() => onSelectType(v)} key={idx}>{typeText[v]}</WhiteTitle>
                })}
            </Modal>
        </View>
    )
}

export default CampaignSortFilter
