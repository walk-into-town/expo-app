import React, { useEffect, useState } from 'react';
import { Image, Platform, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TuseState } from '@types';
import { OutLineButton } from './elements/buttons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { API } from '../api';
import { DefaultAlert } from './elements/alerts';
import { Gray } from './elements/texts';
import { isLocalFile } from '../util';


export const ImgPicker = (props: { useImgs: TuseState<string[]> }) => {
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
        setImgList(imgList.filter((_, i) => i != idx));
    }

    return (
        <View style={{ width: "100%" }}>
            <OutLineButton title="사진 추가" onPress={pickImage} />
            {
                imgList.length > 0 && <Gray style={{ marginVertical: 4 }}>
                    * 사진을 클릭하면 삭제 됩니다.
                </Gray>
            }
            <ScrollView horizontal>
                {imgList.map((uri, idx) =>
                    <TouchableOpacity key={idx} onPress={() => onImgPress(idx)}>
                        <Image
                            source={{ uri: uri }}
                            style={{ width: 100, height: 100, marginRight: 4 }}
                        />
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    );
}

export const ImgPickerToServer = (props: { useImgs: TuseState<string[]> }) => {
    const [imgList, setImgList] = props.useImgs;
    // 서버로 이미지를 보내라는 경보
    const [warn, setWarn] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setWarn(isLocalFile(imgList))
    }, [imgList])

    const sendOnSever = () => {
        const init = async () => {
            if (!warn) return;

            setLoading(true)
            const localFile = imgList.filter(v => v.substring(0, 4) === "file");
            const { result, data, error, errdesc } = await API.sendFile(localFile)
            setLoading(false)

            if (result === "failed" || data === undefined)
                return DefaultAlert({ title: error, subTitle: errdesc })

            setImgList([...imgList.filter(v => v.substring(0, 4) !== "file"), ...data])
            DefaultAlert({ title: "성공적으로 서버에 사진을 전송했습니다.", btColor: "default" })
        }
        init();
    }

    return (
        <View style={{ marginBottom: 20, width: "100%" }}>
            <ImgPicker useImgs={[imgList, setImgList]} />
            <Gray style={{ marginVertical: 4 }}>{warn ? "* 서버로 이미지를 전송해야합니다." : ""}</Gray>
            <OutLineButton title={loading ? "..." : "서버에 사진 전송"} onPress={sendOnSever} disabled={!warn || loading} />
        </View>
    );
}