import { TuseState } from '@types'
import React, { useState } from 'react'
import { isBlank } from '../../util';

import { Animated, TouchableOpacity, View } from 'react-native';
import { Button, Input, ListItem, Text } from 'react-native-elements';
import Modal from 'react-native-modal';
import { BtsWrapper, EvilIcons, FontAwesome, OutLineButton, SubTitle } from '../../atoms'

import Swipeable from 'react-native-gesture-handler/Swipeable';
import SimpleSwapListItem from '../../atoms/SimpleSwapListItem';


interface Props {
    useGoods: TuseState<string[]>;
}

const AddCouponGoods = (props: Props) => {
    const [goods, setGoods] = props.useGoods;
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
                goods[editIdx] = input;
                setGoods(goods);
            }
            else
                setGoods([...goods, input]);
        }
        toggleModal();
    }
    const onDelete = (idx: number) => {
        setGoods([...goods.slice(0, idx), ...goods.slice(idx + 1)])
    }

    return (
        <View>
            <SubTitle>쿠폰 상품</SubTitle>
            {
                goods.map((v, idx) =>
                    <SimpleSwapListItem key={idx}
                        text={v}
                        onText={() => onEdit(idx, v)}
                        onDelete={() => onDelete(idx)} 
                    />
                )
            }
            <OutLineButton title="쿠폰 상품 추가" onPress={toggleModal} style={{ marginTop: 4 }} />

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

export default AddCouponGoods
