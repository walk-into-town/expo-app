import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'
import { EditModalNavParamList } from '@types';
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { API } from '../../api';
import { ImgPicker, TextArea, HeaderRightCheckIcon, DefaultAlert } from '../../atoms';
import { perventGoBack, useAuthContext, useSubmit } from '../../useHook';


const WritePinPointCommentStack = () => {
    const { auth: { userToken } } = useAuthContext();
    if (userToken === undefined) return <></>

    const { params: { pid, pname, comment } } = useRoute<RouteProp<EditModalNavParamList, "WritePinPointCommentStack">>();
    const nav = useNavigation();

    const [text, setText] = useState(comment?.text || "");
    const [imgs, setImgs] = useState<string[]>(comment?.imgs || []);

    useEffect(() => {
        nav.setOptions({
            headerTitle: comment ? `${pname} 댓글 수정` : `${pname} 댓글`,
            headerRight: () => <HeaderRightCheckIcon onPress={onSubmit} />,
        })
    }, [pname])

    const { isSubmit, onSubmit } = useSubmit({
        submitFunc: async () => {
            const { result, data, error, errdesc } = comment ?
                await API.pinpointCommentUpdate({
                    coid: comment.coid,
                    pid,
                    text,
                    uid: userToken.id
                })
                : await API.pinpointCommentCreate({
                    pid,
                    comments: {
                        userId: userToken.id,
                        text
                    },
                    imgs
                });
            if (result === "failed" || data === undefined)
                return DefaultAlert({ title: error, subTitle: errdesc });
            
            nav.goBack();
        }
    })
    perventGoBack({ hasUnsavedChanges: !isSubmit })

    return (
        <View style={{ marginHorizontal: 10, marginTop: 20 }}>
            <TextArea
                value={text}
                onChangeText={setText}
                placeholder="작성한 평가는 모두 공개되며, 다른 사용자가 볼 수 있습니다."
            />
            <ImgPicker useImgs={[imgs, setImgs]} />
        </View>
    )
}

export default WritePinPointCommentStack
