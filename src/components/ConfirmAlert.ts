import { Alert } from 'react-native'

interface Props {
    title?: string,
    subTitle?: string,
    onConfirm: () => void
}

const ConfirmAlert = ({ title, subTitle, onConfirm = () => {} }: Props) => {

    Alert.alert(
        title || "정말 시행하시겠습니까?",
        subTitle,
        [
            { text: "아니오", style: 'cancel', onPress: () => {} },
            {
                text: '확인',
                style: 'destructive',
                onPress: onConfirm,
            },
        ]
    );
}

export default ConfirmAlert
