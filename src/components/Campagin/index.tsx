import { useNavigation } from '@react-navigation/core';
import { NavigationProp } from '@react-navigation/native';
import { CampaginStackParamList } from '@types';
import React from 'react'
import { Button, Text } from 'react-native-elements';
import styled from 'styled-components/native';

interface Props {

}

export default (props: Props) => {
    const navigation:NavigationProp<CampaginStackParamList> = useNavigation();
    return (
        <Container>
            <Button
                title="내 캠페인"
                type="clear"
                onPress={() => navigation.navigate('MyCampagin') }
            />
            <Button
                title="나만의 캠페인 만들기"
                type="clear"
                onPress={() => navigation.navigate('MakeCampagin') }
            />
            <Button
                title="캠페인 검색하기"
                type="clear"
                onPress={() => navigation.navigate('SearchCampagin')}
            />
            <CampaignList>
                <Text>Recommend Campaign List</Text>
            </CampaignList>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`

const CampaignList = styled.View`
    padding-top: 10%;
`