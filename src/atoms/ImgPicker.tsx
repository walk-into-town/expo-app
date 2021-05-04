import React from 'react';
import { Image, Platform, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Text } from 'react-native-elements';
import { TuseState } from '@types';
import { OutLineButton } from './elements/buttons';
import { Row } from './elements/layouts';
import { TouchableOpacity } from 'react-native-gesture-handler';


const ImgPicker = (props: { useImgs: TuseState<string[]> }) => {
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
        <View style={{ marginBottom: 20, width: "100%" }}>
            <OutLineButton title="사진 추가" onPress={pickImage} />
            <Text>* 사진을 클릭하면 삭제 됩니다.</Text>
            <Row>
                {imgList.map((uri, idx) =>
                    <TouchableOpacity key={idx} onPress={() => onImgPress(idx)}>
                        <Image
                            source={{ uri: uri }}
                            style={{ width: 100, height: 100 }}
                        />
                    </TouchableOpacity>
                )}
            </Row>
        </View>
    );
}

export default ImgPicker;