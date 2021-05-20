import { SearchCampaign } from '@types'
import React from 'react'
import { SubTitle } from '../../atoms'

import CampaignCard from './CampaignCard'
//  https://github.com/kohver/react-native-touchable-scale

interface Props {
    isFetchingData: boolean,
    campaginList: SearchCampaign[]
}

const CampaignList = ({ isFetchingData, campaginList }: Props) => {
    if (isFetchingData)
        return (<SubTitle style={{textAlign: "center"}}> 로딩중 </SubTitle>)
    
    return (
        <>
            {
                campaginList.map((campagin, idx) =>
                    <CampaignCard
                        key={idx}
                        campagin={campagin}
                    />
                )
            }
        </>
    )
}
export default CampaignList;
