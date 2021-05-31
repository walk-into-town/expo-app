import React from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/core';

interface Props {
    hasUnsavedChanges: boolean
    title?: string
    subTitle?: string
}

const perventGoBack = (props: Props) => {
    const navigation = useNavigation();

    React.useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            if (!props.hasUnsavedChanges) return;

            e.preventDefault();
            Alert.alert(
                props.title || '정말 취소하시겠어요?',
                props.subTitle || '현재 입력된 내용이 전부 사라집니다.',
                [
                    { text: "아니오", style: 'cancel', onPress: () => { } },
                    {
                        text: '취소합니다',
                        style: 'destructive',
                        onPress: () => navigation.dispatch(e.data.action),
                    },
                ]
            );
        })
        return () => navigation.removeListener('beforeRemove', () => { })
    }, [props.hasUnsavedChanges, navigation]
    );
}

export default perventGoBack;