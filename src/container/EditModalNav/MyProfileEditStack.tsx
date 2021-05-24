import React, { useState } from 'react'

import { Container, DefaultAlert, InputModal, SubmitButton } from '../../atoms'
import { useAuthContext, useLoadingContext } from '../../useHook';
import SingleImgPicker from '../../atoms/SingleImgPicker';
import { API } from '../../api';
import { useNavigation } from '@react-navigation/core';

interface Props {
    isModalVisible: boolean,
    toggleModal: () => void
}

const MyProfileEditStack = (props: Props) => {
    const nav = useNavigation();
    const { auth: { userToken }, useAuth: { onEdit } } = useAuthContext();
    const { useLoading: { startLoading, endLoading } } = useLoadingContext();
    if (userToken === undefined) return <></>;

    const [imgUri, setImgUri] = useState(userToken.profileImg);
    const [nickname, setNickname] = useState(userToken.nickname);
    const [selfIntroduction, setSelfIntroduction] = useState(userToken.selfIntroduction);

    const onSubmit = () => {
        const init = async () => {
            // const { result, data, error, errdesc } = await API.debugSendImg(getImgForm());
            // console.log(result, data, error, errdesc);

            startLoading();
            const profileImg = getImgForm();
            const modiNickname = userToken.nickname === nickname ? "" : nickname;
            const { result, data, error, errdesc } = await API.memberModify({ uid: userToken.id, nickname: modiNickname, selfIntroduction, img: profileImg });
            endLoading();

            if (result === "failed" || data === undefined) {
                DefaultAlert({ title: error, subTitle: errdesc });
                return;
            }
            console.log("[프로필 수정]", data);
            const newUri = data.profileImg || imgUri;
            onEdit({ nickname, profileImg: newUri, selfIntroduction });
            console.log(nickname, newUri, selfIntroduction)
            nav.goBack();
        }
        init();
    }

    const getImgForm = () => {
        // https://stackoverflow.com/questions/42521679/how-can-i-upload-a-photo-with-expo
        // https://github.com/g6ling/React-Native-Tips/issues/1
        const formData = new FormData();
        if (imgUri === userToken.profileImg) {
            formData.append('img', "");
            return formData;
        }

        const fileName = imgUri.split('/').pop();
        const fileType = imgUri.split('.').pop();

        const file = JSON.parse(JSON.stringify({
            uri: imgUri,
            name: fileName,
            type: `image/${fileType}`
            // type: `image/jpeg`
        }))
        formData.append('img', file);
        return formData;
    }

    return (
        <Container style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
            <SingleImgPicker useImg={[imgUri, setImgUri]} />

            <InputModal
                useText={[nickname, setNickname]}
                subTitle={userToken.id}
            />
            <InputModal
                useText={[selfIntroduction, setSelfIntroduction]}
                type="textarea"
            />
            <SubmitButton title="완료" onPress={onSubmit} />
        </Container>
    )
}

export default MyProfileEditStack
