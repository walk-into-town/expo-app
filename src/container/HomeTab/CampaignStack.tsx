import React, { useEffect, useState } from 'react'

import { Container, DefaultAlert, SubTitle } from '../../atoms';
import CampaignSearchBar from '../../components/CampaignStack/CampaignSearchBar';
import CampaignList from '../../components/CampaignStack/CampaignList';
import { API } from '../../api';
import { CampaignSearchCondition, CampaignSearchType, SearchCampaign } from '@types';
import { ScrollView } from 'react-native';
import CampaignSortFilter from '../../components/CampaignStack/CampaignSortFilter';

const dummy: SearchCampaign = {
    id: "zxcvasdfqwer",
    ownner: "aaaa",
    name: "이정연 식수",
    description: "소공의 자랑",
    imgs: [],
    region: "임시",
    pinpoints: ["q", "a", "b", "c", "d"],
    coupons: ["qiweuy6t"],
    updateTime: new Date().toISOString(),
    comments: []
}

const CampaignStack = () => {
    const [searchText, setSearchText] = useState("")
    const [type, setType] = useState<CampaignSearchType>("name")
    const [condition, setCondition] = useState<CampaignSearchCondition>("part")
    const [campaginList, setCamPaginList] = useState<SearchCampaign[]>([dummy]);
    const [isFetchingData, setIsFetchingData] = useState(false);

    useEffect(() => {
        const getSearchCampaign = async () => {
            setIsFetchingData(true);
            const { result, error, errdesc, data } = searchText === "" ? await API.campaignReadAll()
                : await API.campaignSearch({ condition, type, value: searchText });
            setIsFetchingData(false);

            if (result === "failed" || data === undefined) {
                DefaultAlert({ title: error, subTitle: errdesc })
                return;
            }
            setCamPaginList([dummy, ...data]);
        }
        getSearchCampaign();
    }, [searchText])

    return (
        <Container>
            <CampaignSearchBar
                useSearchText={[searchText, setSearchText]}
            />
            <CampaignSortFilter
                useType={[type, setType]}
                useCondition={[condition, setCondition]}
            />

            <ScrollView>
                <CampaignList
                    isFetchingData={isFetchingData}
                    campaginList={campaginList}
                />
            </ScrollView>
        </Container>
    )
}

export default CampaignStack;