import React, { useState } from 'react'
import { mainNavigation } from '../../navigation/useNavigation';
import { Text } from 'react-native-elements';
import { Container } from '../../atoms/styled';
import { ClearButton } from '../../atoms';
import SearchCampagin from '../../components/CampaginStack/SearchCampagin';
import CampaginList from '../../components/CampaginStack/CampaginList';

const Campagin = () => {
    const mainNav = mainNavigation();

    const [value, setValue] = useState("")
    const [searchText, setSearchText] = useState("")

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

            />
        </Container>
    )
}

export default Campagin;