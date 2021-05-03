import React, { useEffect, useState } from 'react'
import { mainNavigation } from '../../navigation/useNavigation';

import { Text } from 'react-native-elements';
import { Container, ClearButton } from '../../atoms';
import SearchCampagin from '../../components/CampaginStack/SearchCampagin';
import CampaginList from '../../components/CampaginStack/CampaginList';
import { API } from '../../api';
import { Campagin } from '@types';

const CampaginStack = () => {
    const mainNav = mainNavigation();

    const [value, setValue] = useState("")
    const [searchText, setSearchText] = useState("")
    const [campaginList, setCamPaginList] = useState<Campagin[]>([]);

    useEffect(() => {
        const getAllCampagin = async () => {
            const { result, session, error, message } = await API.campaginReadAll();
            console.log(result, message, error)
        }
        getAllCampagin();
    }, [])

    return (
        <Container>
            <ClearButton
                title="나만의 캠페인 만들기"
                type="clear"
                onPress={() => mainNav.navigate('MakeCampaginNav', { screen: "MakeCampaginStack", params: {} })}
            />
            <SearchCampagin
                useValue={[value, setValue]}
                useSearchText={[searchText, setSearchText]}
            />
            <Text style={{ textAlign: "center" }}>{searchText}</Text>

            <CampaginList
                campaginList={campaginList}
            />
        </Container>
    )
}

export default CampaginStack;