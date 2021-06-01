import { RouteProp, useRoute } from '@react-navigation/core'
import { EditModalNavParamList } from '@types';
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Divider } from 'react-native-elements';
import { API } from '../../api';
import { ImgPicker, TextArea, RatedStar, HeaderRightCheckIcon, DefaultAlert } from '../../atoms';
import { mainNavigation, perventGoBack, useAuthContext, useLoadingContext, useSubmit } from '../../useHook';



const WriteCampaignCommentStack = () => {
    const { params: { caid, cname, comment } } = useRoute<RouteProp<EditModalNavParamList, "WriteCampaignCommentStack">>();
    const { auth: { userToken } } = useAuthContext();
    const { useLoading: { startLoading, endLoading } } = useLoadingContext();
    if (userToken === undefined) return <></>

    const mainNav = mainNavigation();

    const [rated, setRated] = useState(comment?.rated || 3);
    const [text, setText] = useState(comment?.text || "");
    const [imgs, setImgs] = useState<string[]>(comment?.imgs || []);

    useEffect(() => {
        mainNav.setOptions({
            headerTitle: comment ? `${cname} 리뷰 수정` : `${cname} 리뷰`,
            headerRight: () => <HeaderRightCheckIcon onPress={onSubmit} />,
        })

    }, [cname])

    const inVaildInputs = () => {
        if (text === "") {
            DefaultAlert({ title: "내용을 입력해 주세요!" });
            return true;
        }
        return false;
    }

    const { isSubmit, onSubmit } = useSubmit({
        submitFunc: async () => {
            if (inVaildInputs()) return;

            startLoading();
            const { result, data, error, errdesc } = comment ?
                // 리뷰 수정
                await API.campaignCommentUpdate({
                    caid,
                    rid: comment.rid,
                    text,
                    imgs,
                    rated,
                    uid: userToken.id
                })
                // 리뷰 등록
                : await API.campaignCommentCreate({
                    caid,
                    comments: { userId: userToken.id, text },
                    imgs,
                    rated
                });
            if (result === "failed" || data === undefined) {
                DefaultAlert({ title: error, subTitle: errdesc, onPress: endLoading });
                return;
            }
            endLoading();
            mainNav.goBack();
        }
    })
    perventGoBack({ hasUnsavedChanges: !isSubmit })

    return (
        <View style={{ marginHorizontal: 10 }}>
            <RatedStar useRated={[rated, setRated]} />
            <Divider style={{ marginVertical: 20 }} />
            <TextArea
                value={text}
                onChangeText={setText}
                placeholder="작성한 평가는 모두 공개되며, 다른 사용자가 볼 수 있습니다."
            />
            <ImgPicker useImgs={[imgs, setImgs]} />
        </View>
    )
}

export default WriteCampaignCommentStack
