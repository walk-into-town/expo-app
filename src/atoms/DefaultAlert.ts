import { Alert } from 'react-native'

interface Props {
    title: string,
    subTitle: string,
    btColor?: "destructive" | "default" | "cancel"
}

const DefaultAlert = ({ title, subTitle, btColor = "destructive" }: Props) => {

    Alert.alert(
        title,
        subTitle,
        [
            { text: "확인", style: btColor, onPress: () => { } }
        ]
    );
}

export default DefaultAlert
