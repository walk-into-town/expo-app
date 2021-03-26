import { NavigationProp, useNavigation } from "@react-navigation/core";
import { CampaginStackParamList, MainStackParamList, ModalStackParamList } from "@types";

const mainNavigation = () => {
    return useNavigation<NavigationProp<MainStackParamList>>();
}
const campaginNavigation = () => {
    return useNavigation<NavigationProp<CampaginStackParamList>>();
}
const modalNavigation = () => {
    return useNavigation<NavigationProp<ModalStackParamList>>();
}

export { mainNavigation, campaginNavigation, modalNavigation }