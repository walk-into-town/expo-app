import React, { useEffect, useState } from 'react'

import { Container, ClearButton, DefaultAlert } from '../../atoms';
import CampaignSearchBar from '../../components/CampaignStack/CampaignSearchBar';
import CampaignList from '../../components/CampaignStack/CampaignList';
import { API } from '../../api';
import { SearchCampaign } from '@types';
import { ScrollView } from 'react-native';

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
    const [value, setValue] = useState("test")
    const [searchText, setSearchText] = useState("test")
    const [campaginList, setCamPaginList] = useState<SearchCampaign[]>([dummy]);

    useEffect(() => {
        const getSearchCampaign = async () => {
            const { result, error, errdesc, data } = await API.campaginSearch(searchText);
            if (result === "failed" || error !== undefined || errdesc !== undefined) {
                DefaultAlert({ title: error, subTitle: errdesc })
                return;
            }
            if (data !== undefined)
                setCamPaginList([dummy, ...data]);
        }
        getSearchCampaign();
    }, [searchText])

    return (
        <Container>
            <CampaignSearchBar
                useValue={[value, setValue]}
                useSearchText={[searchText, setSearchText]}
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