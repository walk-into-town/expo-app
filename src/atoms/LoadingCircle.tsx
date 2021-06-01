import React from 'react'
import LottieView from "lottie-react-native";
import { animationPath } from '../util';

interface Props {
    size?: number
}
const LoadingCircle = (props: Props) => {
    return (
        <LottieView
            style={{ alignSelf: "center", width: props.size || 100, height: props.size || 100 }}
            source={animationPath.loading}
            speed={1.4}
            autoPlay
            loop
        />
    )
}

export default LoadingCircle
