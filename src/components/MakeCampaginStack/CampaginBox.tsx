import { TuseState } from '@types'
import React from 'react'
import { Input } from 'react-native-elements'
import { Box, ImgPicker, InputModal } from '../../atoms'

interface Props {
    useTitle: TuseState<string>,
    useCampaginImgs: TuseState<string[]>,
    useDepiction: TuseState<string>,
}

const CampaginBox = (props: Props) => {

    return (
        <Box>
            <InputModal useText={props.useTitle} placeholder="캠페인 제목을 입력해주세요" />

            <ImgPicker useImgs={props.useCampaginImgs} />

            <InputModal
                useText={props.useDepiction}
                placeholder="캠페인 설명을 입력해주세요."
                type="textarea"
            />

            <Input placeholder="지역 설정" />
        </Box>
    )
}

export default CampaginBox
