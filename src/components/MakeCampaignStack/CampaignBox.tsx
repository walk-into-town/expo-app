import { TuseState } from '@types'
import React from 'react'
import { Input } from 'react-native-elements'
import { Box, ImgPicker, InputModal } from '../../atoms'

interface Props {
    useTitle: TuseState<string>,
    useCampaignImgs: TuseState<string[]>,
    useDescription: TuseState<string>,
}

const CampaignBox = (props: Props) => {

    return (
        <Box>
            <InputModal useText={props.useTitle} placeholder="캠페인 제목을 입력해주세요" />

            <ImgPicker useImgs={props.useCampaignImgs} />

            <InputModal
                useText={props.useDescription}
                placeholder="캠페인 설명을 입력해주세요."
                type="textarea"
            />

        </Box>
    )
}

export default CampaignBox
