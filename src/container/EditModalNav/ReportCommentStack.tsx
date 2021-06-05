import { RouteProp, useRoute } from '@react-navigation/core';
import { EditModalNavParamList } from '@types';
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { HeaderRightCheckIcon, InputModal } from '../../atoms'
import { mainNavigation, useAuthContext, useLoadingContext } from '../../useHook';

interface Props {

}

const ReportCommentStack = (props: Props) => {
    const mainNav = mainNavigation();
    const { params: { type, comment, id } } = useRoute<RouteProp<EditModalNavParamList, "ReportCommentStack">>();
    const { auth: { userToken } } = useAuthContext();
    const { useLoading: { startLoading, endLoading } } = useLoadingContext();
    if (userToken === undefined) return <></>

    const [text, setText] = useState("")

    useEffect(() => {
        mainNav.setOptions({
            headerTitle: type === "campaign" ? `리뷰 신고하기` : `댓글 신고하기`,
            headerRight: () => <HeaderRightCheckIcon onPress={onSubmit} />,
        })
    }, [])

    const onSubmit = () => {
        const init = async () => {
            startLoading()

            endLoading()
        }
    }

    return (
        <View style={{ paddingTop: 50 }}>
            <InputModal
                placeholder="신고 사유를 입력해 주세요."
                useText={[text, setText]}
                type="textarea"
                subTitle="정확한 사유를 기제하시면 더 빠르게 조치됩니다."
            />
        </View>
    )
}

export default ReportCommentStack
