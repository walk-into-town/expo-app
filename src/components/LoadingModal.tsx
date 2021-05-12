import React, { useEffect, useState } from 'react'
import { Image, ImageSourcePropType } from 'react-native';
import Modal from 'react-native-modal';
import { loadingPath } from '../atoms/paths';

const loadingGif: ImageSourcePropType[] = [...Object.values(loadingPath)]

interface Props {
    loading: boolean;
}
const LoadingModal = ({ loading }: Props) => {
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        if (loading) {
            setIdx(Math.floor(Math.random() * loadingGif.length));
        }
    }, [loading])

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
                source={loadingGif[idx]}
                style={{ width: "20%", aspectRatio: 1, resizeMode: "contain" }} />
        </Modal>
    )
}

export default LoadingModal;
