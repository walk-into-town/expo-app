import { NavigationProp, useNavigation } from "@react-navigation/core";
import { MainStackParamList, MakeCampaginStackParamList, ModalStackParamList, MyPageStackParamList } from "@types";

const mainNavigation = () => {
    return useNavigation<NavigationProp<MainStackParamList>>();
}
const makeCampaginNavigation = () => {
    return useNavigation<NavigationProp<MakeCampaginStackParamList>>();
}
const myPageNavigation = () => {
    return useNavigation<NavigationProp<MyPageStackParamList>>();
}
const modalNavigation = () => {
    return useNavigation<NavigationProp<ModalStackParamList>>();
}

export { mainNavigation, makeCampaginNavigation, myPageNavigation, modalNavigation }