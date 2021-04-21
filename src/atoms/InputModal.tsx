import React, { useState } from 'react'
import { StyleProp, TextStyle, View, TouchableOpacity } from 'react-native'
import { Input, Text } from 'react-native-elements';
import Modal from 'react-native-modal';
import { FontAwesome } from './icons';
import { BtsWrapper } from './styled';
import { Animation, CustomAnimation } from 'react-native-animatable';

interface Props {
    useText: [string, React.Dispatch<React.SetStateAction<string>>],
    placeholder?: string,
    subTitle?: string,
    type?: "input" | "textarea" | "number",
    textFontSize?: number,
    animationIn?: Animation | CustomAnimation,
    animationOut?: Animation | CustomAnimation
}
interface styleInterface {
    wrapper: StyleProp<TextStyle>,
    text: StyleProp<TextStyle>,
    input: StyleProp<TextStyle>
}

const InputModal = ({ useText, placeholder, subTitle, type = "input", textFontSize = 20, animationIn, animationOut }: Props) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [text, setText] = useText;
    const [input, setInput] = useState(text);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const openModal = () => {
        setInput(text);
        toggleModal();
    }
    const onSubmit = () => {
        setText(input);
        toggleModal();
    }

    const getStyle = (): styleInterface => {
        switch (type) {
            case "input": case "number":
                return {
                    wrapper: { marginTop: 30, marginBottom: 20 },
                    text: { fontSize: textFontSize, fontFamily: "SCDream8", alignSelf: "center" },
                    input: { color: "#FFF", fontSize: 30, fontFamily: "SCDream6" }
                }
            case "textarea":
                return {
                    wrapper: {},
                    text: { height: 100, fontSize: 13, fontFamily: "SCDream5", marginHorizontal: 7 },
                    input: { color: "#FFF", height: 200, fontSize: 20, fontFamily: "SCDream5" }
                }
        }
    }
    const onChangeText = (text: string) => {
        switch (type) {
            case "input": case "textarea":
                return setInput(text);
            case "number":
                return setInput(text.replace(/[^0-9]/g, ''));
        }
    }

    return (
        <View style={getStyle().wrapper}>
            <TouchableOpacity onPress={openModal}>
                <Text style={getStyle().text}>
                    {text || placeholder || "제목명을 입력해주세요"}
                </Text>
            </TouchableOpacity>
            <Text style={{ alignSelf: "center", marginTop: 1 }}> {subTitle} </Text>

            <Modal 
                isVisible={isModalVisible}
                animationIn={animationIn || "zoomIn"}
                animationOut={animationOut || "fadeOut"}
                avoidKeyboard
            >
                <Input
                    autoFocus
                    selectionColor={"#FFF"} style={getStyle().input}
                    value={input}
                    onChangeText={onChangeText}
                    multiline={type === "textarea"}
                    keyboardType={type === "number" ? "numeric" : "default"}
                // onEndEditing={() => {
                //     if (type === 'input') onSubmit();
                // }}
                />

                <BtsWrapper>
                    <TouchableOpacity onPress={toggleModal} style={{ marginRight: 20 }}>
                        <FontAwesome name="close" color={"#FFF"} size={40} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onSubmit}>
                        <FontAwesome name="check" color={"#FFF"} size={40} />
                    </TouchableOpacity>
                </BtsWrapper>
            </Modal>
        </View>
    )
}

export default InputModal;
