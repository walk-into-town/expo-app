import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'
import { ModalNavParamList } from '@types'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'


const ImageViewer = () => {
    const { params: { images } } = useRoute<RouteProp<ModalNavParamList, "ImageViewer">>();
    const nav = useNavigation();
    if (images.length === 0) {
        nav.goBack();
        return <></>
    }

    useEffect(() => {
        nav.setOptions({
            headerTitle: `${images.length}개의 이미지`
        })
    }, [])



    return (
        <ScrollView style={{paddingTop: 60}}>
            {
                images.map((uri, idx) => (
                    <Image
                        key={idx}
                        source={{ uri }}
                        style={{ width: "100%", aspectRatio: 1, resizeMode: "contain"}}
                    />
                ))
            }
        </ScrollView>
    )
}

export default ImageViewer
