import { RouteProp, useRoute } from '@react-navigation/core';
import { EditModalNavParamList } from '@types';
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { API } from '../../api';
import { ClearButton, DefaultAlert, HeaderRightCheckIcon, Text1, TextArea } from '../../atoms'
import Footer from '../../components/Footer';
import { mainNavigation, useAuthContext, useLoadingContext } from '../../useHook';
import { isBlank } from '../../util';


const ReportCommentStack = () => {
    const mainNav = mainNavigation();
    const { params: { type, comment, id } } = useRoute<RouteProp<EditModalNavParamList, "ReportCommentStack">>();
    const { auth: { userToken } } = useAuthContext();
    const { useLoading: { startLoading, endLoading } } = useLoadingContext();
    if (userToken === undefined) return <></>

    const [text, setText] = useState("")

    useEffect(() => {
        mainNav.setOptions({
            headerTitle: type === "Campaign" ? `리뷰 신고하기` : `댓글 신고하기`,
            headerRight: () => <HeaderRightCheckIcon onPress={onSubmit} />,
        })
    }, [])

    const onSubmit = () => {
        const init = async () => {
            if (isBlank([text]))
                return DefaultAlert({ title: "신고 내용을 적어주세요." })


            startLoading()
            const { result, data, error, errdesc } = await API.managerReport({
                type,
                typeId: id,
                targetId: comment.id,
                description: text,
                targetUser: comment.userId
            })
            if (result === "failed" || data === undefined)
                return DefaultAlert({ title: error, subTitle: errdesc, onPress: endLoading })

            DefaultAlert({ title: "신고가 접수 되었습니다", subTitle: `[접수번호] ${data}`, onPress: endLoading });
            mainNav.goBack()
        }
        init();
    }

    return (
        <View style={{ flex: 1, paddingTop: 50, paddingHorizontal: 15 }}>
            <TextArea
                value={text}
                onChangeText={setText}
                placeholder="신고 사유를 입력해 주세요."
            />
            <Text1 style={{ marginLeft: 4 }}>* 정확한 사유를 기제하시면 더 빠르게 조치됩니다.</Text1>
            <Text1 style={{ marginLeft: 4, marginTop: 16 }}>조치되는 방법</Text1>
            <Text1 style={{ marginLeft: 4 }}>- 댓글의 사진이 삭제됩니다.</Text1>
            <Text1 style={{ marginLeft: 4 }}>- 글이 '관리자에의해 삭제되었습니다'로 대체됩니다.</Text1>
            <Text1 style={{ marginLeft: 4 }}>- 사용자는 일정 사긴동안 접속이 차단됩니다.</Text1>
            <ClearButton
                title="신고"
                style={{ marginLeft: "auto" }}
                onPress={onSubmit}
            />
            <Footer />
        </View>
    )
}

export default ReportCommentStack
