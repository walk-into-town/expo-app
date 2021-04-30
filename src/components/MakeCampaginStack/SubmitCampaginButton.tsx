import React from 'react'
import { Button } from 'react-native-elements';

interface Props {
    onSubmit: () => void
}

const SubmitCampaginButton = (props: Props) => {
    return (
        < Button
            title="캠페인 만들기"
            onPress={props.onSubmit}
            style={{ marginTop: 20 }}
            titleStyle={{ fontFamily: "SCDream7" }}
        />
    )
}

export default SubmitCampaginButton;
