import React, { useState } from 'react'
import { Input } from 'react-native-elements'
import { Container } from '../../atoms/atoms'

interface Props {

}

const MakePinPointModal = (props: Props) => {
    const [title, setTitle] = useState("")

    return (
        <Container>
            <Input
                onChangeText={(text: string) => setTitle(text)}
                inputStyle={{ textAlign: "center" }}
                placeholder="핀포인트 이름"
            />
        </Container>
    )
}

export default MakePinPointModal
