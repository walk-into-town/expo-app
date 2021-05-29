import React, { useEffect, useState } from 'react';
import { Image, Platform, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TuseState } from '@types';
import { ClearButton, OutLineButton } from './elements/buttons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colorCode } from './color';
import { API } from '../api';
import { DefaultAlert } from './elements/alerts';
import { Gray } from './elements/texts';
import { isLocalFile } from '../util';

interface props {
    useImg: TuseState<string>,
    prevFunc?: () => void,
    afterFunc?: () => void
}
const SingleImgPicker = (props: props) => {
    const [img, setImg] = props.useImg;
    const [warn, setWarn] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setWarn(isLocalFile([img]))
    }, [img])

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

    const sendOnSever = () => {
        const init = async () => {
            if (!warn) return;

            setLoading(true)
            const { result, data, error, errdesc } = await API.sendFile([img])
            setLoading(false)
            if (result === "failed" || data === undefined)
                return DefaultAlert({ title: error, subTitle: errdesc })

            setImg(data[0])
            DefaultAlert({ title: "성공적으로 서버에 사진을 전송했습니다.", btColor: "default" })
        }
        init();
    }


    return (
        <View style={{ marginBottom: 20, width: "100%", alignItems: "center" }}>
            {
                img === "" ?
                    <View style={{ borderWidth: .5, borderColor: colorCode.primary }}>
                        <ClearButton title="사진 추가" onPress={pickImage} style={{ justifyContent: 'center', width: 150, height: 150 }} />
                    </View>
                    :
                    <>
                        <TouchableOpacity onPress={pickImage}>
                            <Image
                                source={{ uri: img }}
                                style={{ width: 150, height: 150 }}
                            />
                        </TouchableOpacity>
                        <Gray style={{ marginVertical: 4 }}>{warn ? "* 서버로 이미지를 전송해야합니다." : ""}</Gray>
                        <OutLineButton title={loading ? "..." : "서버에 사진 전송하기"} onPress={sendOnSever} disabled={!warn || loading} />
                    </>
            }
        </View>
    );
}

export default SingleImgPicker;