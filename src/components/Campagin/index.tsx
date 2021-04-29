import React from 'react'
import { Text } from 'react-native-elements';
import styled from 'styled-components/native';
import { ClearButton } from '../../atoms';
import { Container } from '../../atoms/styled';
import { mainNavigation } from '../../navigation/useNavigation';
import SearchCampagin from './SearchCampagin';

export default () => {
    const mainNav = mainNavigation();

    return (
        <Container>
            <ClearButton
                title="나만의 캠페인 만들기"
                type="clear"
                onPress={() => mainNav.navigate('MakeCampaginStack', { screen: "MakeCampagin", params: {}})}
            />
            <SearchCampagin />
            <CampaignList>
                <Text>Recommend Campaign List</Text>
            </CampaignList>
        </Container>
    )
}

const CampaignList = styled.View`
    padding-top: 10%;
`