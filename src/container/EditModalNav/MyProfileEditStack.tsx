import React, { useState } from 'react'
import { API } from '../../api';
import { useNavigation } from '@react-navigation/core';
import { useAuthContext, useLoadingContext } from '../../useHook';

import { Container, DefaultAlert, InputModal, SingleImgPicker, SubmitButton } from '../../atoms'


const MyProfileEditStack = () => {
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
            const isNicknameEdit = userToken.nickname === nickname;
            const isSelfIntroductionEdit = userToken.selfIntroduction === selfIntroduction;
            const isProfileImgEdit = userToken.profileImg === imgUri;

            if (isNicknameEdit && isSelfIntroductionEdit && isProfileImgEdit)
                return nav.goBack();

            startLoading();
            const { result, data, error, errdesc } = await API.memberModify({
                uid: userToken.id,
                selfIntroduction: isSelfIntroductionEdit ? "" : selfIntroduction,
                nickname: isNicknameEdit ? "" : nickname,
                img: isProfileImgEdit ? "" : imgUri
            });
            endLoading();

            if (result === "failed" || data === undefined) {
                DefaultAlert({ title: error, subTitle: errdesc });
                return;
            }
            console.log("[프로필 수정]", data);
            const newUri = data.profileImg || imgUri;
            onEdit({ nickname, profileImg: newUri, selfIntroduction });
            nav.goBack();
        }
        init();
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
