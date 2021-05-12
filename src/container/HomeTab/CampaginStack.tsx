import React, { useEffect, useState } from 'react'
import { mainNavigation } from '../../navigation/useNavigation';

import { Container, ClearButton, DefaultAlert } from '../../atoms';
import CampaginSearchBar from '../../components/CampaginStack/CampaginSearchBar';
import CampaginList from '../../components/CampaginStack/CampaginList';
import { API } from '../../api';
import { SearchCampagin } from '@types';
import { ScrollView } from 'react-native';

const dummy: SearchCampagin = {
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

const CampaginStack = () => {
    const [value, setValue] = useState("")
    const [searchText, setSearchText] = useState("금오톡톡")
    const [campaginList, setCamPaginList] = useState<SearchCampagin[]>([dummy]);

    useEffect(() => {
        const getSearchCampagin = async () => {
            const { result, error, errdesc, data } = await API.campaginSearch(searchText);
            if (result === "failed" || error !== undefined || errdesc !== undefined) {
                DefaultAlert({ title: error, subTitle: errdesc })
                return;
            }
            if (data !== undefined)
                setCamPaginList([dummy, ...data]);
        }
        getSearchCampagin();
    }, [searchText])

    return (
        <Container>
            <CampaginSearchBar
                useValue={[value, setValue]}
                useSearchText={[searchText, setSearchText]}
            />
            <ScrollView>
                <CampaginList
                    campaginList={campaginList}
                />
            </ScrollView>
        </Container>
    )
}

export default CampaginStack;