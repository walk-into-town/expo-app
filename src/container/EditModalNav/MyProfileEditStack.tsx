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
    const [nickname, setNickname] = useState(userToken.nickname);
    const [selfIntroduction, setSelfIntroduction] = useState(userToken.selfIntroduction);

    const onSubmit = () => {
        const init = async () => {
            const formData = new FormData();

            const filename = profileImg.split('/').pop();
            if (filename === undefined) return;

            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : `image`;
            // https://stackoverflow.com/questions/42521679/how-can-i-upload-a-photo-with-expo
            // https://github.com/g6ling/React-Native-Tips/issues/1
            formData.append('photo', JSON.parse(JSON.stringify({ uri: profileImg, name: filename, type })));

            const { result, data } = await API.debugSendImg(formData);
            console.log(result, data)
        }
        init();
    }

    return (
        <Container style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
            <SingleImgPicker useImgs={[profileImg, setProfileImg]} />

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
