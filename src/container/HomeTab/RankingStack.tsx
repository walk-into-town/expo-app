import React from 'react'
import { Text } from 'react-native'
import { Container } from '../../atoms/styled'

interface Props {

}

const RankingStack = (props: Props) => {
    return (
        <Container>
            <Text>🏆 랭크</Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text>몬스터 최다 처치수</Text>
            <Text>1. ㅇㅇㅇ</Text>
            <Text>2. ㅇㅇㅇ</Text>
            <Text>3. ㅇㅇㅇ</Text>
            <Text>4. ㅇㅇㅇ</Text>
            <Text>5. ㅇㅇㅇ</Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text>캠페인 최다 클리어</Text>
            <Text>1. ㅇㅇㅇ</Text>
            <Text>2. ㅇㅇㅇ</Text>
            <Text>3. ㅇㅇㅇ</Text>
            <Text>4. ㅇㅇㅇ</Text>
            <Text>5. ㅇㅇㅇ</Text>
        </Container>
    )
}

export default RankingStack
