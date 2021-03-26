import { Input } from "react-native-elements"

type IOption = {
    placeholder: string,
    onChangeText: Function
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