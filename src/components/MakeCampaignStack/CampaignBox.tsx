import { TuseState } from '@types'
import React from 'react'
import { Box, ImgPickerToServer, InputModal } from '../../atoms'

interface Props {
    useTitle: TuseState<string>,
    useCampaignImgs: TuseState<string[]>,
    useDescription: TuseState<string>,
}

const CampaignBox = (props: Props) => {

    return (
        <Box>
            <InputModal useText={props.useTitle} placeholder="캠페인 제목을 입력해주세요" />

            <ImgPickerToServer useImgs={props.useCampaignImgs} />

            <InputModal
                useText={props.useDescription}
                placeholder="캠페인 설명을 입력해주세요."
                type="textarea"
            />

        </Box>
    )
}

export default CampaignBox
