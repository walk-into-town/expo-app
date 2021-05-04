import { Alert } from 'react-native'

interface Props {
    title: string,
    subTitle: string,
    btColor?: "destructive" | "default" | "cancel"
    onPress?: () => void
}

const DefaultAlert = ({ title, subTitle, btColor = "destructive", onPress = () => {} }: Props) => {

    Alert.alert(
        title,
        subTitle,
        [
            { text: "확인", style: btColor, onPress: onPress }
        ]
    );
}

export default DefaultAlert
