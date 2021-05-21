import { SearchCampaign } from '@types'
import React from 'react'
import { SubTitle } from '../../atoms'

import CampaignCard from './CampaignCard'
//  https://github.com/kohver/react-native-touchable-scale

interface Props {
    isFetchingData: boolean,
    campaignList: SearchCampaign[]
}

const CampaignList = ({ isFetchingData, campaignList }: Props) => {
    if (isFetchingData)
        return (<SubTitle style={{textAlign: "center"}}> 로딩중 </SubTitle>)
    
    return (
        <>
            {
                campaignList.map((campaign, idx) =>
                    <CampaignCard
                        key={idx}
                        campaign={campaign}
                    />
                )
            }
        </>
    )
}
export default CampaignList;
