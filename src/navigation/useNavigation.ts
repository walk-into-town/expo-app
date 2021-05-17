import { NavigationProp, useNavigation } from "@react-navigation/core";
import { MainStackParamList, MakeCampaignStackParamList, ModalStackParamList } from "@types";

const mainNavigation = () => {
    return useNavigation<NavigationProp<MainStackParamList>>();
}
const makeCampaignNavigation = () => {
    return useNavigation<NavigationProp<MakeCampaignStackParamList>>();
}
const modalNavigation = () => {
    return useNavigation<NavigationProp<ModalStackParamList>>();
}

export { mainNavigation, makeCampaignNavigation, modalNavigation }