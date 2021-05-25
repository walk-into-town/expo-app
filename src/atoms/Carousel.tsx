import React, { useCallback, useState } from 'react'
import { FlatList, Dimensions, Image, NativeSyntheticEvent, NativeScrollEvent, View, Pressable } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { mainNavigation } from '../useHook';
import { colorCode } from './color';

interface CarouselProps {
    images: string[]
    navToImgViewer?: () => void
}

export const Carousel = (props: CarouselProps) => {
    const [idx, setIdx] = useState(0);
    const pageWidth = Math.round(Dimensions.get('window').width);

    const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const newIdx = Math.round(
            e.nativeEvent.contentOffset.x / pageWidth,
        );
        setIdx(newIdx);
    };

    const renderItem = useCallback(({ item }: { item: string }) => (
        <Pressable onPress={props.navToImgViewer}>
            <Image
                source={{ uri: item }}
                style={{
                    width: pageWidth,
                    height: "100%",
                }}
            />
        </Pressable>
    ), [])
    const keyExtractor = useCallback((item: string) => (
        `page_${item}`
    ), [])

    return (
        <FlatList
            automaticallyAdjustContentInsets={false}
            data={props.images}
            horizontal
            decelerationRate="fast"
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            onScroll={onScroll}
            snapToInterval={pageWidth}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            removeClippedSubviews
            initialNumToRender={1}
            maxToRenderPerBatch={2}
            windowSize={3}
        />
    )
}

interface AbsoluteCouselProps {
    images: string[]
    height?: number
    absoluteHeight?: number
}
export const AbsoluteCousel = (props: AbsoluteCouselProps) => {
    const nav = mainNavigation();
    const navToImgViewer = () => {
        nav.navigate("ModalNav", { screen: 'ImageViewer', params: { images: props.images } })
    }

    return <View style={{ height: props.height || 200 }}>
        <View style={{ position: "absolute", height: props.absoluteHeight || 250 }}>
            <Carousel
                images={props.images}
                navToImgViewer={navToImgViewer}
            />
        </View>
    </View>
}
