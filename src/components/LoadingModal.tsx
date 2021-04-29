import React from 'react'
import { Image } from 'react-native';
import Modal from 'react-native-modal';
import { loadingPath } from '../atoms/paths';

const loadingGif = [...Object.values(loadingPath)]

interface Props {
    loading: boolean;
}
const LoadingModal = ({ loading }: Props) => {
    const gifUri = loadingGif[Math.floor(Math.random() * loadingGif.length)]
    
    return (
        <Modal
            isVisible={loading}
            style={{ justifyContent: "center", alignItems: "center" }}
            animationIn={'tada'}
            animationInTiming={1000}
            animationOut={'slideOutRight'}
            animationOutTiming={1000}
            backdropOpacity={0.8}
        >
            <Image
                source={gifUri}
                style={{ width: "20%", aspectRatio: 1, resizeMode: "contain" }} />
        </Modal>
    )
}

export default LoadingModal;
