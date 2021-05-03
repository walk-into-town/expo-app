import { ButtonProps, SearchBarIosProps, SearchBarProps } from "react-native-elements";


declare module "@types" {
    type LightSearchBarProps = SearchBarProps | {
        value: string;
        onChangeText: (text: string) => void;
        onSubmitEditing?: () => void;
    };

    type SubmitButtonProps = {
        title: string;
        onPress: () => void;
        option?: ButtonProps;
    };
}