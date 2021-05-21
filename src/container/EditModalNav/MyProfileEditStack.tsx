import React, { useState } from 'react'

import { Container, InputModal, SubmitButton } from '../../atoms'
import { useAuthContext } from '../../useHook';
import SingleImgPicker from '../../atoms/SingleImgPicker';
import { API } from '../../api';

interface Props {
    isModalVisible: boolean,
    toggleModal: () => void
}

const MyProfileEditStack = (props: Props) => {

    const { auth: { userToken } } = useAuthContext();
    if (userToken === undefined) return <></>;

    const [profileImg, setProfileImg] = useState(userToken.profileImg);
    const [img64, setImg64] = useState("");
    const [nickname, setNickname] = useState(userToken.nickname);
    const [selfIntroduction, setSelfIntroduction] = useState(userToken.selfIntroduction);

    const onSubmit = () => {
        const init = async () => {
            // https://stackoverflow.com/questions/42521679/how-can-i-upload-a-photo-with-expo
            // https://github.com/g6ling/React-Native-Tips/issues/1

            const uri = profileImg;
            const fileName = profileImg.split('/').pop();
            const fileType = profileImg.split('.').pop();
            if (fileType === undefined) return;

            const formData = new FormData();
            const file = JSON.parse(JSON.stringify({
                uri,
                name: fileName,
                type: `image/${fileType}`
            }))
            formData.append('img', file);

            const res = await API.debugSendImg(formData);
            console.log(res)
        }
        init();
    }

    return (
        <Container style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
            <SingleImgPicker useImg={[profileImg, setProfileImg]} useImg64={[img64, setImg64]} />

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
