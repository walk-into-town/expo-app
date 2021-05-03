import React from 'react'
import { Button } from 'react-native-elements';




interface Props {
    onSubmit: () => Promise<void>
}

const SubmitPinPointLocationButton=(props: Props)=>{
    return (
        < Button
            title="핀포인트 위치 추가하기"
            onPress={props.onSubmit}
            style={{ marginTop: 20 }}
            titleStyle={{ fontFamily: "SCDream7" }}
        />
    )
}

export default SubmitPinPointLocationButton;