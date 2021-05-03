import { TuseState } from '@types'
import React from 'react'
import { View, Text } from 'react-native'
import { Row, ClearButton, ImgPicker, InputModal } from '../../atoms'

interface Props {
    useName: TuseState<string>,
    useLatitude: TuseState<number>,
    useLongitude: TuseState<number>,
    usePinPointImgs: TuseState<string[]>,
    useDescription: TuseState<string>,
}

const MakePinPoint = (props: Props) => {
    const [name, setName] = props.useName;
    const [latitude, setLatitude] = props.useLatitude;
    const [longitude, setLongitude] = props.useLongitude;
    const [pinPointImgs, setPinPointImgs] = props.usePinPointImgs;
    const [description, setDescription] = props.useDescription;

    return (
        <>
            <InputModal
                useText={[name, setName]}
                placeholder="핀포인트명을 입력해주세요"
            />

            <Row>
                <ClearButton
                    title="위치찾기"
                    onPress={() => console.log('위치 찾기 api 연동')}
                />
                <Text>위도 {latitude} 경도 {longitude}</Text>
            </Row>
            <ImgPicker useImgs={[pinPointImgs, setPinPointImgs]} />

            <InputModal
                useText={[description, setDescription]}
                placeholder="핀포인트 설명을 입력해주세요."
                type="textarea"
            />
        </>
    )
}

export default MakePinPoint
