import React, { useState } from 'react'
import { View } from 'react-native'
import { Input, Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BtsWrapper } from './styled';

interface Props {
    useTitle:[string, React.Dispatch<React.SetStateAction<string>>]
}

const TitleInputModal = (props: Props) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = props.useTitle;
    const [input, setInput] = useState(title);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const openModal = () => {
        setInput(title);
        toggleModal();
    }
    const onChange = () => {
        setTitle(input);
        toggleModal();
    }

    return (
        <View>
            <TouchableOpacity onPress={openModal}>
                <Text style={{fontSize: 20, fontFamily:"SCDream8", fontWeight: '600', alignSelf: "center" ,marginVertical: 30}}> {title || "제목명을 입력해주세요"} </Text>
            </TouchableOpacity>

            <Modal isVisible={isModalVisible} animationOutTiming={5}>
                <Input 
                    autoFocus 
                    selectionColor={"#FFF"} style={{color: "#FFF", fontSize: 35, fontWeight: "600"}}
                    value={input}
                    onChangeText={(text:string) => setInput(text)}
                    onEndEditing={onChange}/>
                <BtsWrapper>
                    <TouchableOpacity onPress={toggleModal} style={{marginRight: 20}}>
                        <Icon name="close" color={"#FFF"} size={40}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onChange}>
                        <Icon name="check" color={"#FFF"} size={40}/>
                    </TouchableOpacity>
                </BtsWrapper>
            </Modal>
        </View>
    )
}

export default TitleInputModal
