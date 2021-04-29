import React from 'react'
import { Button } from 'react-native-elements';

interface Props {
    editIndex: number | undefined,
    onSubmit: () => Promise<void>,
}

const SubmitCouponButton = ({ editIndex, onSubmit }: Props) => {
    return (
        <Button
            title={editIndex !== undefined ? "쿠폰 수정하기" : "쿠폰 추가하기"}
            onPress={onSubmit}
            style={{ marginVertical: 30 }}
            titleStyle={{ fontFamily: "SCDream7" }}
        />
    )
}

export default SubmitCouponButton;
