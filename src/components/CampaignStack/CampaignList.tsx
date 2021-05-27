import { SearchCampaign } from '@types'
import React from 'react'
import { LoadingCircle, } from '../../atoms'

import CampaignCard from './CampaignCard'
//  https://github.com/kohver/react-native-touchable-scale

interface Props {
    isFetchingData: boolean,
    campaignList: SearchCampaign[]
}

const CampaignList = ({ isFetchingData, campaignList }: Props) => {
    return (
        isFetchingData ?
            <LoadingCircle />
            :
            campaignList.map((campaign, idx) =>
                <CampaignCard
                    key={idx}
                    campaign={campaign}
                />
            )
    )
}
export default CampaignList;
