import { SearchCampaign } from '@types'
import React from 'react'
import { View } from 'react-native'
import { LoadingCircle, SubTitle, } from '../../atoms'
import { animationPath } from '../../util'
import LottieView from "lottie-react-native";

import CampaignCard from './CampaignCard'
//  https://github.com/kohver/react-native-touchable-scale

interface Props {
    isFetchingData: boolean,
    campaignList: SearchCampaign[]
}

const CampaignList = ({ isFetchingData, campaignList }: Props) => {
    return <>
        {
            isFetchingData ?
                <LoadingCircle />
                :
                campaignList.length === 0 ?
                    <View style={{ flex: 1, alignItems: "center", paddingTop: 50 }}>
                        <LottieView
                            source={animationPath.found}
                            autoPlay
                            loop
                            style={{width: 300}}
                        />
                        <SubTitle>조회된 캠페인이 없군요.</SubTitle>
                    </View>
                    : campaignList.map((campaign, idx) => (
                        <CampaignCard
                            key={idx}
                            campaign={campaign}
                        />
                    ))
        }
    </>
}
export default CampaignList;
