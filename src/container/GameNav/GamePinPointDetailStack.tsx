import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'
import { GameNavParamList, ModalNavParamList, WritePinPointComment } from '@types'
import React, { useEffect, useState } from 'react'

import { ScrollView } from 'react-native-gesture-handler'
import PinPointCommentBox from '../../components/PinPointDetailStack/PinPointCommentBox'
import PinPointInfo from '../../components/PinPointDetailStack/PinPointInfo'
import Footer from '../../components/Footer'
import { mainNavigation, useAuthContext } from '../../useHook'
import { RefreshControl } from 'react-native'
import { API } from '../../api'
import { DefaultAlert } from '../../atoms'



const GamePinPointDetailStack = () => {
    const { auth: { userToken } } = useAuthContext();
    if (userToken === undefined) return <>userToken error</>
    const { params } = useRoute<RouteProp<GameNavParamList, "GamePinPointDetailStack">>();
    const [pinpoint, setPinpoint] = useState(params.pinpoint)
    const [comments, setComments] = useState(params.pinpoint.comments)
    const [refreshing, setRefreshing] = useState(false)

    // nav
    const mainNav = mainNavigation();
    useEffect(() => {
        mainNav.setOptions({ headerTitle: `${params.campaignName}의 핀포인트` })
    }, [params.campaignName])
    
    const navToWriteComment = (comment: WritePinPointComment | null) => {
        mainNav.navigate("EditModalNav", {
            screen: "WritePinPointCommentStack",
            params: { pid: pinpoint.id, pname: pinpoint.name, comment }
        })
    }

    // api
    const getComment = async () => {
        const { result, data, error, errdesc } = await API.pinpointCommentRead(pinpoint.id)
        if (result === 'failed' || data === undefined)
            return DefaultAlert({ title: error, subTitle: errdesc })

        setComments(data)
    }
    const deleteComment = (coid: string) => {
        const init = async () => {
            const { result, data, error, errdesc } = await API.pinpointCommentDelete({ pid: pinpoint.id, coid, uid: userToken.id })
            if (result === 'failed' || data === undefined)
                return DefaultAlert({ title: error, subTitle: errdesc })

            onRefresh();
        }
        init();
    }

    // usecase
    const onRefresh = () => {
        const init = async () => {
            setRefreshing(true)
            await getComment()
            setTimeout(() => setRefreshing(false), 500)
        }
        init();
    }
    const onRate = (coid: string, like: boolean) => {
        const init = async () => {
            const { result, data, error, errdesc } = await API.pinpointCommentRate({ coid, like, pid: pinpoint.id, uid: userToken.id })
            if (result === 'failed' || data === undefined)
                return DefaultAlert({ title: error, subTitle: errdesc })

            onRefresh();
        }
        init();
    }

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <PinPointInfo pinpoint={pinpoint} />
            <PinPointCommentBox
                comments={comments}
                navToWriteComment={navToWriteComment}
                deleteComment={deleteComment}
                onRate={onRate}
            />
            <Footer />
        </ScrollView>
    )
}

export default GamePinPointDetailStack
