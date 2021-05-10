import React, { useEffect, useState } from 'react'
import { mainNavigation, modalNavigation } from '../../navigation/useNavigation';

import { Container, ClearButton } from '../../atoms';
import CampaginSearchBar from '../../components/CampaginStack/CampaginSearchBar';
import CampaginList from '../../components/CampaginStack/CampaginList';
import { API } from '../../api';
import { SearchCampagin } from '@types';

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
    const mainNav = mainNavigation();

    const [value, setValue] = useState("")
    const [searchText, setSearchText] = useState("금오톡톡")
    const [campaginList, setCamPaginList] = useState<SearchCampagin[]>([dummy]);

    useEffect(() => {
        const getSearchCampagin = async () => {
            const { result, error, message } = await API.campaginSearch(searchText);
            console.log(result, message, error);
            if (message !== undefined)
                setCamPaginList([dummy, ...message]);
        }
        getSearchCampagin();
    }, [searchText])

    return (
        <Container>
            <ClearButton
                title="나만의 캠페인 만들기"
                type="clear"
                onPress={() => mainNav.navigate('MakeCampaginNav', { screen: "MakeCampaginStack", params: {} })}
            />
            <CampaginSearchBar
                useValue={[value, setValue]}
                useSearchText={[searchText, setSearchText]}
            />

            <CampaginList
                campaginList={campaginList}
            />
        </Container>
    )
}

export default CampaginStack;