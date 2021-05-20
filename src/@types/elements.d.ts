import { ButtonProps, SearchBarIosProps, SearchBarProps } from "react-native-elements";


declare module "@types" {
    type LightSearchBarProps = SearchBarProps | {
        value: string;
        onChangeText: (text: string) => void;
        onSubmitEditing?: () => void;
    };

    type SubmitButtonProps = {
        option?: ButtonProps;
        title: string;
        onPress: () => void;
    };

    type BadgeButtonProps = {
        option?: ButtonProps;
        title: string;
        onPress: () => void;
        color?: string
    }

    interface ITitleBadge {
        title: string,
        backgroundColor: '#ff3b30' | 'black'
    }
}