import { SearchCampagin } from '@types'
import React from 'react'
import { ScrollView } from 'react-native'

import CampaginCard from './CampaginCard'
//  https://github.com/kohver/react-native-touchable-scale

interface Props {
    campaginList: SearchCampagin[]
}

const CampaginList = ({ campaginList }: Props) => {
    return (
        <>
            {
                campaginList.map((campagin, idx) =>
                    <CampaginCard
                        key={idx}
                        campagin={campagin}
                    />
                )
            }
        </>
    )
}
export default CampaginList;
