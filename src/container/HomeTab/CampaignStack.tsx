import React, { useEffect, useState } from 'react'

import { Container, DefaultAlert, SubTitle } from '../../atoms';
import CampaignSearchBar from '../../components/CampaignStack/CampaignSearchBar';
import CampaignList from '../../components/CampaignStack/CampaignList';
import { API } from '../../api';
import { CampaignSearchCondition, CampaignSearchType, SearchCampaign } from '@types';
import { ScrollView } from 'react-native';
import CampaignSortFilter from '../../components/CampaignStack/CampaignSortFilter';

const CampaignStack = () => {
    const [searchText, setSearchText] = useState("")
    const [type, setType] = useState<CampaignSearchType>("name")
    const [condition, setCondition] = useState<CampaignSearchCondition>("part")
    const [campaignList, setCampaignList] = useState<SearchCampaign[]>([]);
    const [isFetchingData, setIsFetchingData] = useState(false);

    useEffect(() => {
        getSearchCampaign();
    }, [])

    const getSearchCampaign = async () => {
        setIsFetchingData(true);
        const { result, error, errdesc, data } = searchText === "" ? await API.campaignReadAll()
            : await API.campaignSearch({ condition, type, value: searchText });
        setIsFetchingData(false);

        if (result === "failed" || data === undefined) {
            DefaultAlert({ title: error, subTitle: errdesc })
            return;
        }
        setCampaignList([...data]);
    }

    const reset = () => {
        setSearchText("");
        setType("name");
        setCondition("part");
        getSearchCampaign();
    }

    return (
        <Container>
            <CampaignSearchBar
                useSearchText={[searchText, setSearchText]}
                getSearchCampaign={getSearchCampaign}
            />
            <CampaignSortFilter
                useType={[type, setType]}
                useCondition={[condition, setCondition]}
                useCampaignList={[campaignList, setCampaignList]}
                reset={reset}
            />

            <ScrollView>
                <CampaignList
                    isFetchingData={isFetchingData}
                    campaignList={campaignList}
                />
            </ScrollView>
        </Container>
    )
}

export default CampaignStack;