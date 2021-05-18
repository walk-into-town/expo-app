import { NavigationProp, useNavigation } from "@react-navigation/core";
import { EditModalParamList, GameNavParamList } from "@types";
import { MainStackParamList, MakeCampaignNavParamList, ModalNavParamList } from "@types";

const mainNavigation = () => {
    return useNavigation<NavigationProp<MainStackParamList>>();
}
const makeCampaignNavigation = () => {
    return useNavigation<NavigationProp<MakeCampaignNavParamList>>();
}
const gameNavigation = () => {
    return useNavigation<NavigationProp<GameNavParamList>>();
}
const modalNavigation = () => {
    return useNavigation<NavigationProp<ModalNavParamList>>();
}
const editModalNavigation = () => {
    return useNavigation<NavigationProp<EditModalParamList>>();
}

export { mainNavigation, makeCampaignNavigation, gameNavigation, modalNavigation, editModalNavigation }