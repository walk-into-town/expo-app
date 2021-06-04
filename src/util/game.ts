import { Animated, Easing } from "react-native"

export const shakeAnimation = (shake: Animated.Value, option?: { range: number, minValue: number }) => {
    const range = option?.range || 30;
    const minValue = option?.minValue || 10
    const toValue = Math.floor(Math.random() * range + minValue)
    const duration = Math.floor(Math.random() * 700 + 300)

    Animated.sequence([
        Animated.timing(shake, { toValue, duration, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0, duration, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -toValue, duration, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0, duration, useNativeDriver: true })
    ]).start(() => shakeAnimation(shake, option));
}

export const defeatAnimation = (transX: Animated.Value, toValue: number) => {
    const duration = 100;
    const shake = [
        Animated.timing(transX, { toValue, duration, useNativeDriver: true, easing: Easing.bounce }),
        Animated.timing(transX, { toValue: 0, duration, useNativeDriver: true, easing: Easing.bounce }),
        Animated.timing(transX, { toValue: -toValue, duration, useNativeDriver: true, easing: Easing.bounce }),
        Animated.timing(transX, { toValue: 0, duration, useNativeDriver: true, easing: Easing.bounce })
    ]
    const sequence = shake.concat(...shake)
    Animated.sequence(sequence).start();
}

export const fadeAnimation = (opacity: Animated.Value, toValue = 0) => {
    Animated.timing(opacity, {
        toValue,
        duration: 300,
        useNativeDriver: true
    }).start();
}