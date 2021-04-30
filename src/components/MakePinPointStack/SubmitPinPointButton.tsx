import React from 'react'
import { Button } from 'react-native-elements'

interface Props {
    onSubmit: () => void
}

const SubmitPinPointButton = (props: Props) => {
    return (
        <Button
            title="핀포인트 완료"
            onPress={props.onSubmit}
            style={{ marginBottom: 50 }}
            titleStyle={{ fontFamily: "SCDream7" }}
        />
    )
}

export default SubmitPinPointButton
