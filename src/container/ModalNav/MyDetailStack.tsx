import { RouteProp, useRoute } from '@react-navigation/core';
import { ModalNavParamList, MyCampaign, PlayingCampaign } from '@types';
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { API } from '../../api';
import { ButtonTabs, DefaultAlert } from '../../atoms'
import ClearedCampaignList from '../../components/MyDetailStack/ClearedCampaignList';
import MakedCampaignList from '../../components/MyDetailStack/MakedCampaignList';
import ParticiaptedCampaginList from '../../components/MyDetailStack/ParticiaptedCampaginList';
import { useAuthContext } from '../../useHook';

interface Props {

}

const MyDetailStack = (props: Props) => {
    const { auth: { userToken } } = useAuthContext();
    if (userToken === undefined) return <>userToken error</>

    const { params: { selectedIndex } } = useRoute<RouteProp<ModalNavParamList, 'MyDetailStack'>>();

    const [value, setValue] = useState(0);
    useEffect(() => {
        if (selectedIndex)
            setValue(selectedIndex)
    }, [selectedIndex])

    const [myCampaignList, setMyCampaignList] = useState<MyCampaign[]>([]);
    const [playingCampaignList, setPlayingCampaignList] = useState<PlayingCampaign[]>([]);
    useEffect(() => {
        const initMyCampaign = async () => {
            const { result, data, errdesc, error } = await API.memberMyCampaign(userToken.id);
            if (result === "failed" || data === undefined)
                return DefaultAlert({ title: error, subTitle: errdesc })

            setMyCampaignList(data)
        }
        const initPlayingCmapaign = async () => {
            const { result, data, error, errdesc } = await API.memberPlayingCampaign(userToken.id);
            if (result === "failed" || data === undefined)
                return DefaultAlert({ title: error, subTitle: errdesc })

            setPlayingCampaignList(data)
        }
        initMyCampaign();
        initPlayingCmapaign();
    }, []);

    return (
        <View>
            <ButtonTabs
                isFullHigh
                selectedIndex={value}
                onPress={setValue}
                buttons={["제작한 캠페인", "참여중인 캠페인", "클리어한 캠페인"]}
                viewList={[
                    <MakedCampaignList myCampaignList={myCampaignList} />,
                    <ParticiaptedCampaginList playingCampaignList={playingCampaignList} />,
                    <ClearedCampaignList />
                ]}
            />

        </View>
    )
}

export default MyDetailStack
