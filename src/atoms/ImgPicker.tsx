import React, { useState } from 'react';
import { Button, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


const ImgPicker = () => {
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (granted === false)
                    alert('카메라 접근권한이 필요합니다 😢');
            }
        })();

        let result = await ImagePicker.launchImageLibraryAsync();

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <>
            <Button title="사진 선택" onPress={pickImage} />

            {image ? <Image
                source={{ uri: image }}
            /> : null}

        </>
    );
}

export default ImgPicker;