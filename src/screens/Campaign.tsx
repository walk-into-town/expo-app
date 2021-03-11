import React from 'react'
import { Button, Text } from 'react-native-elements';
import styled from 'styled-components/native';

interface Props {

}

const Campaign = (props: Props) => {
    return (
        <Container>
            <Button
                title="Create Campaign"
                type = "clear"
            />
            <Button
                title="Search Campaign"
                type = "clear"
            />
            <Text>Recommend Campaign</Text>
        </Container>
    )
}

export default Campaign;


const Container = styled.View`
    flex: 1;
    align-items: center;
`
