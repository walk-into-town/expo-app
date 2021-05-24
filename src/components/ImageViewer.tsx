import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'
import { ModalNavParamList } from '@types'
import React, { useEffect, useState } from 'react'
import { View, Image } from 'react-native'
import { HeaderLeftCloseIcon } from '../atoms'

const ImageViewer = () => {
    const { params: { images } } = useRoute<RouteProp<ModalNavParamList, "ImageViewer">>();
    const nav = useNavigation();
    if (images.length === 0) {
        nav.goBack();
        return <></>
    }
    const [idx, setIdx] = useState(0);
    useEffect(() => {
        nav.setOptions({
            headerTitle: `${idx + 1} / ${images.length}`,
            headerTitleStyle: { color: "white" },
            headerLeft: <HeaderLeftCloseIcon
                toggle
                color={"white"}
                onPress={() => nav.goBack()}
            />
        })
    }, [])

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image source={{ uri: images[0] }} style={{ width: "100%", height: "100%" }} />
            
        </View>
    )
}

export default ImageViewer
