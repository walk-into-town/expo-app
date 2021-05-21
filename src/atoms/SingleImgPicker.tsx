import React from 'react';
import { Image, Platform, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TuseState } from '@types';
import { ClearButton } from './elements/buttons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colorCode } from './color';

interface props {
    useImg: TuseState<string>,
    useImg64: TuseState<string>,
    prevFunc?: () => void,
    afterFunc?: () => void
}
const SingleImgPicker = (props: props) => {
    const [img, setImg] = props.useImg;
    const [img64, setImg64] = props.useImg64;

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

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
            base64: true
        });

        if (result.cancelled) return;

        setImg(result.uri);
        if (result.base64)
            setImg64(`data:image/jpg;base64,${result.base64}`);
        
        if (props.afterFunc)
            props.afterFunc();
    };

    return (
        <View style={{ marginBottom: 20, width: "100%", alignItems: "center" }}>
            {
                img === "" ?
                    <View style={{ borderWidth: .5, borderColor: colorCode.primary }}>
                        <ClearButton title="사진 추가" onPress={pickImage} style={{ justifyContent: 'center', width: 200, height: 200 }} />
                    </View>
                    :
                    <TouchableOpacity onPress={pickImage}>
                        <Image
                            source={{ uri: img }}
                            style={{ width: 200, height: 200 }}
                        />
                    </TouchableOpacity>
            }
        </View>
    );
}

export default SingleImgPicker;