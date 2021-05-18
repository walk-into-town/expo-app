import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'
import { EditModalNavParamList } from '@types';
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Divider } from 'react-native-elements';
import { API } from '../../api';
import { ImgPicker, TextArea, RatedStar, HeaderRightCheckIcon } from '../../atoms';
import { perventGoBack, useSubmit } from '../../useHook';

interface Props {

}

const WriteCampaignCommentStack = (props: Props) => {
    const { params: { cid, cname } } = useRoute<RouteProp<EditModalNavParamList, "WriteCampaignCommentStack">>();
    const nav = useNavigation();

    const [rated, setRated] = useState(3);
    const [text, setText] = useState("");
    const [imgs, setImgs] = useState<string[]>([]);

    useEffect(() => {
        nav.setOptions({
            headerTitle: `${cname} 리뷰`,
            headerRight: () => <HeaderRightCheckIcon onPress={onSubmit} />,
        })
    }, [cname])

    const { isSubmit, onSubmit } = useSubmit({
        submitFunc: async () => {
            // const { result, data, error, errdesc } = await API.campaignCommentCreate({ cid, rated, text, imgs })
            nav.goBack();
        }
    })
    perventGoBack({ hasUnsavedChanges: !isSubmit })

    return (
        <View style={{ marginHorizontal: 10 }}>
            <RatedStar useRated={[rated, setRated]} />
            <Divider style={{ marginVertical: 20 }} />
            <TextArea
                onChangeText={setText}
                placeholder="작성한 평가는 모두 공개되며, 다른 사용자가 볼 수 있습니다."
            />
            <ImgPicker useImgs={[imgs, setImgs]} />
        </View>
    )
}

export default WriteCampaignCommentStack
