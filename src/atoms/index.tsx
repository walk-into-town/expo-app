import { Input } from "react-native-elements"

type IOption = {
    placeholder: string,
    onChangeText?: ((text: string) => void)
}
export const TextArea = (option:IOption) => {
    return (
        <Input
            multiline
            numberOfLines={4}
            inputStyle={{ textAlign: "center" }}
            {...option}
        />
    )
}