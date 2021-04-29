import { NavigationProp, useNavigation } from "@react-navigation/core";
import { CampaginStackParamList, MainStackParamList, MakeCampaginStackParamList, ModalStackParamList, MyPageStackParamList } from "@types";

const mainNavigation = () => {
    return useNavigation<NavigationProp<MainStackParamList>>();
}
const campaginNavigation = () => {
    return useNavigation<NavigationProp<CampaginStackParamList>>();
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

export { mainNavigation, campaginNavigation, makeCampaginNavigation, myPageNavigation, modalNavigation }