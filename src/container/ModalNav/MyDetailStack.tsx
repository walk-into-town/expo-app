import { RouteProp, useIsFocused, useRoute } from '@react-navigation/core';
import { ModalNavParamList, MyCampaign, PartedMember, PlayingCampaign } from '@types';
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
    if (userToken === undefined) return <></>

    const isFocused = useIsFocused()
    const { params: { selectedIndex } } = useRoute<RouteProp<ModalNavParamList, 'MyDetailStack'>>();

    const [value, setValue] = useState(0);
    useEffect(() => {
        if (selectedIndex)
            setValue(selectedIndex)
    }, [selectedIndex])

    // 리스트
    const [myCampaignList, setMyCampaignList] = useState<MyCampaign[]>([]);
    const [playingCampaignList, setPlayingCampaignList] = useState<PlayingCampaign[]>([]);
    const [partedUserList, setPartedUserList] = useState<PartedMember[]>([]);
    useEffect(() => {
        if (isFocused) {
            initMyCampaign();
            initPlayingCmapaign();
        }
    }, [isFocused]);

    // api
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
    const getPartedUsers = (caid: string) => {
        const init = async () => {
            const { result, data, errdesc, error } = await API.campaignParticiaptedUsers(caid);
            console.log(data)
            if (result === "failed" || data === undefined)
                return DefaultAlert({ title: error, subTitle: errdesc })

            setPartedUserList(data)
        }
        init();
    }

    return (
        <View>
            <ButtonTabs
                isFullHigh
                selectedIndex={value}
                onPress={setValue}
                buttons={[`제작한 캠페인 ${myCampaignList.length}`, `참여중인 캠페인 ${playingCampaignList.length}`]}
                viewList={[
                    <MakedCampaignList
                        myCampaignList={myCampaignList}
                        usePartedUserList={[partedUserList, setPartedUserList]}
                        getPartedUsers={getPartedUsers}
                    />,
                    <ParticiaptedCampaginList 
                        playingCampaignList={playingCampaignList} 
                            
                    />
                ]}
            />

        </View>
    )
}

export default MyDetailStack
