import React from 'react'
import { Button, Text } from 'react-native-elements';
import styled from 'styled-components/native';

interface Props {

}

export default (props: Props) => {
    return (
        <Container>
            <Button
                title="Create Campaign"
                type="clear"
            />
            <Button
                title="Search Campaign"
                type="clear"
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