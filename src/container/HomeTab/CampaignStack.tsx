import React, { useEffect, useState } from 'react'

import { Container, DefaultAlert, BadgeButton } from '../../atoms';
import CampaignSearchBar from '../../components/CampaignStack/CampaignSearchBar';
import CampaignList from '../../components/CampaignStack/CampaignList';
import { API } from '../../api';
import { CampaginSearchCondition, CampaginSearchType, SearchCampaign } from '@types';
import { ScrollView, View } from 'react-native';
import CampaginSortFilter from '../../components/CampaignStack/CampaginSortFilter';

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
    const [type, setType] = useState<CampaginSearchType>("name")
    const [condition, setCondition] = useState<CampaginSearchCondition>("part")
    const [campaginList, setCamPaginList] = useState<SearchCampaign[]>([dummy]);

    useEffect(() => {
        const getSearchCampaign = async () => {
            const { result, error, errdesc, data } = searchText === "" ? await API.campaginReadAll()
                : await API.campaginSearch({ condition, type, value: searchText });

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
            <CampaginSortFilter
                useType={[type, setType]}
                useCondition={[condition, setCondition]}
            />

            <ScrollView>
                <CampaignList
                    campaginList={campaginList}
                />
            </ScrollView>
        </Container>
    )
}

export default CampaignStack;