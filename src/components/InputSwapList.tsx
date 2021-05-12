import { TuseState } from '@types'
import React, { useState } from 'react'

import { TouchableOpacity, View } from 'react-native';
import { Input } from 'react-native-elements';
import Modal from 'react-native-modal';
import { BtsWrapper, FontAwesome, OutLineButton, SimpleSwapListItem, SubTitle } from '../atoms';
import { isBlank } from '../util';

interface Props {
    title: string,
    useTextList: TuseState<string[]>;
}

const InputSwapList = (props: Props) => {
    const [text, setText] = props.useTextList;
    const [isModalVisible, setModalVisible] = useState(false);
    const [input, setInput] = useState("");
    const [editIdx, setEditIdx] = useState(-1)

    const toggleModal = () => {
        setInput("");
        setEditIdx(-1);
        setModalVisible(!isModalVisible);
    };
    const onEdit = (idx: number, input: string) => {
        toggleModal();
        setEditIdx(idx);
        setInput(input);
    };
    const onCheck = () => {
        if (!isBlank([input])) {
            if (editIdx !== -1) {
                text[editIdx] = input;
                setText(text);
            }
            else
                setText([...text, input]);
        }
        toggleModal();
    }
    const onDelete = (idx: number) => {
        setText([...text.slice(0, idx), ...text.slice(idx + 1)])
    }

    return (
        <View>
            <SubTitle>{props.title}</SubTitle>
            {
                text.map((v, idx) =>
                    <SimpleSwapListItem key={idx}
                        text={v}
                        onText={() => onEdit(idx, v)}
                        onDelete={() => onDelete(idx)}
                    />
                )
            }
            <OutLineButton title={`${props.title} 추가`} onPress={toggleModal} style={{ marginTop: 4 }} />

            <Modal
                isVisible={isModalVisible}
                animationIn={"zoomIn"}
                animationOut={"fadeOut"}
                avoidKeyboard
            >
                <Input
                    autoFocus
                    selectionColor={"#FFF"} style={{ color: "#FFF", fontSize: 30, fontFamily: "SCDream6" }}
                    value={input}
                    onChangeText={(text: string) => setInput(text)}
                    autoCapitalize="none"
                />

                <BtsWrapper>
                    <TouchableOpacity onPress={toggleModal} style={{ marginRight: 20 }}>
                        <FontAwesome name="close" color={"#FFF"} size={40} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onCheck}>
                        <FontAwesome name="check" color={"#FFF"} size={40} />
                    </TouchableOpacity>
                </BtsWrapper>
            </Modal>

        </View>
    )
}

export default InputSwapList
