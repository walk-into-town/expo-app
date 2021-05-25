import { Alert, AlertButton } from 'react-native'

interface DefaultAlertProps {
    title?: string,
    subTitle?: string,
    btColor?: "destructive" | "default" | "cancel"
    onPress?: () => void
}
export const DefaultAlert = (props: DefaultAlertProps) => {
    Alert.alert(
        props.title || "error",
        props.subTitle,
        [
            { text: "확인", style: props.btColor || "destructive", onPress: props.onPress }
        ]
    );
}

interface ConfirmAlertProps {
    title?: string,
    subTitle?: string,
    onConfirm: () => void
}
export const ConfirmAlert = (props: ConfirmAlertProps) => {
    Alert.alert(
        props.title || "정말 시행하시겠습니까?",
        props.subTitle,
        [
            { text: "아니오", style: 'cancel', onPress: () => { } },
            {
                text: '확인',
                style: 'destructive',
                onPress: props.onConfirm,
            },
        ]
    );
}

interface SelectionAlertProps {
    title: string,
    subTitle?: string,
    buttons: AlertButton[]
    onConfirm?: () => void
}
export const SelectionAlert = (props: SelectionAlertProps) => {
    Alert.alert(
        props.title,
        props.subTitle,
        [
            ...props.buttons,
            { text: "확인", onPress: props.onConfirm }
        ]
    );
}