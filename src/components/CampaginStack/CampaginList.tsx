import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'

interface Props {

}

const CampaginList = (props: Props) => {
    return (
        <Wrapper>
            <Text>Recommend Campaign List</Text>
        </Wrapper>
    )
}

const Wrapper = styled.View`
    padding-top: 10%;
`

export default CampaginList;
