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
    const filterButton: BadgeButtonGroupButtonsProps[] = [
        { name: "초기화", func: props.reset },
        { name: "핀포인트 많은 순", func: () => onFilter((a, b) => b.pinpoints.length - a.pinpoints.length) },
        { name: "쿠폰 많은 순", func: () => onFilter((a, b) => b.coupons.length + b.pcoupons.length - a.coupons.length - a.pcoupons.length) },
        { name: "별점 높은 순", func: () => onFilter((a, b) => getRatedAvg(b) - getRatedAvg(a)) },
        { name: "리뷰 많은 순", func: () => onFilter((a, b) => b.comments.length - a.comments.length) },
        { name: "최신 순", func: () => onFilter((a, b) => new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime()) },
    ]
    const onFilter = (func: (a: SearchCampaign, b: SearchCampaign) => number) => {
        const newArr = campaignList.sort(func);
        setCampaignList([...newArr]);
    }

    useEffect(() => {
        // 리프레쉬하면 다시 필터잉
        if (props.refreshing === false && filterIdx > 0)
            filterButton[filterIdx].func();

    }, [props.refreshing])

    return (
        <View style={{ flexDirection: 'row', marginHorizontal: 10, marginBottom: 10 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ marginRight: 15 }}>
                    <BadgeButton title={`검색조건 - ${typeText[type]}`} onPress={toggleTypeModal} backgroundToggle />
                </View>
                <BadgeButtonGroup
                    buttons={filterButton}
                    useFilterIdx={[filterIdx, setFilterIdx]}
                    disableToggleFristBt
                />
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
