import { useNavigation, NavigationProp } from '@react-navigation/core';
import { CampaginStackParamList } from '@types';
import React from 'react'
import { Button, Text } from 'react-native-elements';
import styled, { ThemeProvider } from 'styled-components/native';
import theme from '../../style/theme';


export default () => {
    const navigation: NavigationProp<CampaginStackParamList> = useNavigation();
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Button
                    title="내 캠페인"
                    type="clear"
                    onPress={() => navigation.navigate('MyCampagin')}
                />
                <Button
                    title="나만의 캠페인 만들기"
                    type="clear"
                    onPress={() => navigation.navigate('MakeCampagin')}
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
        </ThemeProvider>
    )
}

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.color.main}
`

const CampaignList = styled.View`
    padding-top: 10%;
`