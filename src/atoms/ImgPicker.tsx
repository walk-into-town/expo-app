import React from 'react';
import { Platform, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image, Text } from 'react-native-elements';
import { Row } from './styled';
import { OutLineButton } from '.';
import { setState } from '@types';


const ImgPicker = (props: { useImgs: [string[], setState] }) => {
    const [imgList, setImgList] = props.useImgs;

    const pickImage = async () => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (granted === false)
                    alert('카메라 접근권한이 필요합니다 😢');
            }
        })();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setImgList([...imgList, result.uri])
        }
    };

    const onImgPress = (idx: number) => {
        setImgList(imgList.filter((img, i) => i != idx));
    }

    return (
        <View style={{marginBottom: 20, width: "100%"}}>
            <OutLineButton title="사진 추가" onPress={pickImage} />
            <Text>* 사진을 클릭하면 삭제 됩니다.</Text>
            <Row>
                {imgList.map((uri, idx) =>
                    <Image 
                        key={idx} 
                        source={{ uri: uri }} 
                        onPress={() => onImgPress(idx)} 
                        style={{ width: 100, height: 100 }}
                    />
                )}
            </Row>
        </View>
    );
}

export default ImgPicker;