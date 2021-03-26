import React from 'react'
import { View, Text } from 'react-native'
import { Button, Container } from '../../atoms/styled'
import { mainNavigation } from '../../navigation/useNavigation'

interface Props {

}

const MakePinPointQuiz = (props: Props) => {
    const mainNav = mainNavigation();
    return (
        <Container>
            <Button title="핀포인트 완료" onPress={() => mainNav.navigate('HomeTab')} />
        </Container>
    )
}

export default MakePinPointQuiz
