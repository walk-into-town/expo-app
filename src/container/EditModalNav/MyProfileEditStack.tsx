import React, { useState } from 'react'

import { Container, InputModal, SubmitButton } from '../../atoms'
import { useAuthContext } from '../../useHook';
import SingleImgPicker from '../../atoms/SingleImgPicker';

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
