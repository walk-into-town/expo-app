import { SearchCampaign } from '@types'
import React from 'react'
import { ScrollView } from 'react-native'

import CampaignCard from './CampaignCard'
//  https://github.com/kohver/react-native-touchable-scale

interface Props {
    campaginList: SearchCampaign[]
}

const CampaignList = ({ campaginList }: Props) => {
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
