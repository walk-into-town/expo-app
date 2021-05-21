import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'
import { EditModalNavParamList } from '@types';
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Divider } from 'react-native-elements';
import { API } from '../../api';
import { ImgPicker, TextArea, RatedStar, HeaderRightCheckIcon, DefaultAlert } from '../../atoms';
import { perventGoBack, useAuthContext, useSubmit } from '../../useHook';

interface Props {

}

const WritePinPointCommentStack = (props: Props) => {
    const { auth: { userToken } } = useAuthContext();
    if (userToken === undefined) return <>userToken error</>

    const { params: { pid, pname } } = useRoute<RouteProp<EditModalNavParamList, "WritePinPointCommentStack">>();
    const nav = useNavigation();

    const [text, setText] = useState("");
    const [imgs, setImgs] = useState<string[]>([]);

    useEffect(() => {
        nav.setOptions({
            headerTitle: `${pname} 댓글`,
            headerRight: () => <HeaderRightCheckIcon onPress={onSubmit} />,
        })
    }, [pname])

    const { isSubmit, onSubmit } = useSubmit({
        submitFunc: async () => {
            const body = { id: pid, comments: { userId: userToken.id, text } };
            const { result, data, error, errdesc } = await API.pinpointCommentCreate(body);
            if (result === "failed" || data === undefined) {
                DefaultAlert({ title: error, subTitle: errdesc })
                return;
            }
            nav.goBack();
        }
    })
    perventGoBack({ hasUnsavedChanges: !isSubmit })

    return (
        <View style={{ marginHorizontal: 10 }}>
            <TextArea
                onChangeText={setText}
                placeholder="작성한 평가는 모두 공개되며, 다른 사용자가 볼 수 있습니다."
            />
            <ImgPicker useImgs={[imgs, setImgs]} />
        </View>
    )
}

export default WritePinPointCommentStack
