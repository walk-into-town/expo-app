import { TuseState } from '@types'
import React from 'react'
import { Text, View } from 'react-native'
import { Row, ClearButton, InputModal, ImgPickerToServer } from '../../atoms'

interface Props {
    useName: TuseState<string>,
    useLatitude: TuseState<number>,
    useLongitude: TuseState<number>,
    usePinPointImgs: TuseState<string[]>,
    useDescription: TuseState<string>,
    navToFindPinPointLocationModal: () => void
}

const MakePinPointView = (props: Props) => {
    const [name, setName] = props.useName;
    const [latitude, setLatitude] = props.useLatitude;
    const [longitude, setLongitude] = props.useLongitude;
    const [description, setDescription] = props.useDescription;

    return (
        <View>
            <InputModal
                useText={[name, setName]}
                placeholder="핀포인트명을 입력해주세요"
            />

            <Row>
                <ClearButton
                    title="위치찾기"
                    onPress={() => props.navToFindPinPointLocationModal()}
                />
                <Text>위도 {latitude} 경도 {longitude}</Text>
            </Row>
            <ImgPickerToServer useImgs={props.usePinPointImgs} />

            <InputModal
                useText={[description, setDescription]}
                placeholder="핀포인트 설명을 입력해주세요."
                type="textarea"
            />
        </View>
    )
}

export default MakePinPointView
