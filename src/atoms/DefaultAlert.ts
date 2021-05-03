import { Alert } from 'react-native'

interface Props {
    title: string,
    subTitle: string,
}

const DefaultAlert = ({ title, subTitle }: Props) => {

    Alert.alert(
        title,
        subTitle,
        [
            { text: "확인", style: 'destructive', onPress: () => { } }
        ]
    );
}

export default DefaultAlert
