import React, { useCallback, useState } from 'react'
import { FlatList, Dimensions, Image, NativeSyntheticEvent, NativeScrollEvent, View, Pressable } from 'react-native'
import { mainNavigation } from '../useHook';
import { imgPath } from '../util';

interface CarouselProps {
    images: string[]
}

export const Carousel = (props: CarouselProps) => {
    const nav = mainNavigation();
    const navToImgViewer = () => {
        nav.navigate("ModalNav", { screen: 'ImageViewer', params: { images: props.images } })
    }
    const [idx, setIdx] = useState(0);
    const pageWidth = Math.round(Dimensions.get('window').width);

    const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const newIdx = Math.round(
            e.nativeEvent.contentOffset.x / pageWidth,
        );
        setIdx(newIdx);
    };

    const renderItem = useCallback(({ item }: { item: string }) => (
        <Pressable onPress={navToImgViewer}>
            <Image
                source={{ uri: item }}
                style={{
                    width: pageWidth,
                    aspectRatio: 1
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
    if (props.images.length < 1)
        return <></>

    return <View style={{ height: props.height || 200 }}>
        <View style={{ position: "absolute", height: props.absoluteHeight || 250 }}>
            <Carousel
                images={props.images}
            />
        </View>
    </View>
}
