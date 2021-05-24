import React from 'react';
import { Image, Platform, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TuseState } from '@types';
import { ClearButton } from './elements/buttons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colorCode } from './color';

interface props {
    useImg: TuseState<string>,
    prevFunc?: () => void,
    afterFunc?: () => void
}
const SingleImgPicker = (props: props) => {
    const [img, setImg] = props.useImg;

    const pickImage = async () => {
        if (props.prevFunc)
            props.prevFunc();

        (async () => {
            if (Platform.OS !== 'web') {
                const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (granted === false)
                    alert('카메라 접근권한이 필요합니다 😢');
            }
        })();

        // https://github.com/expo/expo/issues/11291
        // m1애뮬레이터에서 사진을 고르지 못하는 버그
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1
        });

        if (result.cancelled) return;

        setImg(result.uri);
        
        if (props.afterFunc)
            props.afterFunc();
    };

    return (
        <View style={{ marginBottom: 20, width: "100%", alignItems: "center" }}>
            {
                img === "" ?
                    <View style={{ borderWidth: .5, borderColor: colorCode.primary }}>
                        <ClearButton title="사진 추가" onPress={pickImage} style={{ justifyContent: 'center', width: 150, height: 150 }} />
                    </View>
                    :
                    <TouchableOpacity onPress={pickImage}>
                        <Image
                            source={{ uri: img }}
                            style={{ width: 150, height: 150 }}
                        />
                    </TouchableOpacity>
            }
        </View>
    );
}

export default SingleImgPicker;