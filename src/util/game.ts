import { Animated } from "react-native"

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