import { RouteProp, useRoute } from '@react-navigation/core';
import { ModalStackParamList } from '@types';
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { ButtonTabs } from '../../atoms'
import ClearedCampaignList from '../../components/MyDetailStack/ClearedCampaignList';
import MakedCampaignList from '../../components/MyDetailStack/MakedCampaignList';
import ParticiaptedCampaginList from '../../components/MyDetailStack/ParticiaptedCampaginList';

interface Props {

}

const MyDetailStack = (props: Props) => {
    const { params: { selectedIndex } } = useRoute<RouteProp<ModalStackParamList, 'MyDetailStack'>>();

    const [value, setValue] = useState(0);
    
    useEffect(() => {
        if (selectedIndex)
            setValue(selectedIndex)
    }, [selectedIndex])

    return (
        <View>
            <ButtonTabs
                selectedIndex={value}
                onPress={setValue}
                buttons={["제작한 캠페인", "참여중인 캠페인", "클리어한 캠페인"]}
                viewList={[
                    <MakedCampaignList />,
                    <ParticiaptedCampaginList />,
                    <ClearedCampaignList />
                ]}
            />

        </View>
    )
}

export default MyDetailStack
