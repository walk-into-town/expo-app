import React, { useEffect, useRef } from 'react'
import { View, Text, Animated } from 'react-native'
import { colorCode, Ionicons, TextAnimator } from '../../atoms'

interface Props {
    text: string
}

const DialogBox = (props: Props) => {
    const caretFade = useRef(new Animated.Value(0)).current;

    const animatedCaretFade = (toValue = 1) => {
        Animated.timing(
            caretFade,
            {
                toValue,
                duration: 50,
                useNativeDriver: true
            }
        ).start(() => {
            setTimeout(() => animatedCaretFade(toValue === 0 ? 1 : 0), 500);
        });
    }

    useEffect(() => {
        animatedCaretFade();
    }, [])

    return (
        <View style={{ borderWidth: 2, borderRadius: 5, padding: 1, width: "90%" }}>
            <View style={{ borderWidth: 2, padding: 15 }}>
                <TextAnimator text={props.text} />
            </View>

            <Animated.View style={[
                { position: "absolute", right: 10, bottom: -10 },
                { opacity: caretFade }
            ]}>
                <Ionicons
                    name="caret-down"
                    size={25}
                    style={{ backgroundColor: colorCode.background }}
                />
            </Animated.View>
        </View>
    )
}

export default DialogBox
