import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'
import { ModalNavParamList } from '@types'
import React, { useEffect } from 'react'

import { ScrollView } from 'react-native-gesture-handler'
import PinPointCommentBox from '../../components/PinPointDetailStack/PinPointCommentBox'
import PinPointInfo from '../../components/PinPointDetailStack/PinPointInfo'
import Footer from '../../components/Footer'
import { mainNavigation } from '../../useHook'

interface Props {

}

const PinPointDetailStack = (props: Props) => {
    const { params: { pinpoint, campaignName } } = useRoute<RouteProp<ModalNavParamList, "PinPointDetailStack">>();

    const mainNav = mainNavigation();
    const nav = useNavigation();
    useEffect(() => {
        nav.setOptions({ headerTitle: `${campaignName}의 핀포인트` })
    }, [campaignName])
    const navToWriteComment = () => {
        mainNav.navigate("EditModalNav", { screen: "WritePinPointCommentStack", params: { pid: pinpoint.id, pname: pinpoint.name } })
    }


    return (
        <ScrollView>
            <PinPointInfo pinpoint={pinpoint}/>
            <PinPointCommentBox comments={pinpoint.comments} navToWriteComment={navToWriteComment}/>
            <Footer />
        </ScrollView>
    )
}

export default PinPointDetailStack
