import React, { useEffect, useState } from 'react'

import { Container, DefaultAlert } from '../../atoms';
import CampaignSearchBar from '../../components/CampaignStack/CampaignSearchBar';
import CampaignList from '../../components/CampaignStack/CampaignList';
import { API } from '../../api';
import { CampaignSearchCondition, CampaignSearchType, SearchCampaign } from '@types';
import { RefreshControl, ScrollView } from 'react-native';
import CampaignSortFilter from '../../components/CampaignStack/CampaignSortFilter';

const CampaignStack = () => {
    const [searchText, setSearchText] = useState("")
    const [type, setType] = useState<CampaignSearchType>("name")
    const [condition, setCondition] = useState<CampaignSearchCondition>("part")
    const [campaignList, setCampaignList] = useState<SearchCampaign[]>([]);
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const getSearchCampaign = async () => {
        setIsFetchingData(true);
        const { result, error, errdesc, data } = searchText === "" ? await API.campaignReadAll()
            : await API.campaignSearch({ condition, type, value: searchText });

        if (result === "failed" || data === undefined) {
            DefaultAlert({ title: error, subTitle: errdesc })
            return;
        }
        setCampaignList([...data]);
        setIsFetchingData(false);
        setRefreshing(false);
    }

    useEffect(() => {
        getSearchCampaign();
    }, [])

    const reset = () => {
        setType("name");
        setCondition("part");
        getSearchCampaign();
    }

    const onRefresh = () => {
        setRefreshing(true);
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
                refreshing={refreshing}
            />

            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <CampaignList
                    isFetchingData={isFetchingData}
                    campaignList={campaignList}
                />
            </ScrollView>
        </Container>
    )
}

export default CampaignStack;