import { NavigationProp, useNavigation } from "@react-navigation/core";
import { MainStackParamList, MakeCampaignStackParamList, ModalStackParamList, MyPageStackParamList } from "@types";

const mainNavigation = () => {
    return useNavigation<NavigationProp<MainStackParamList>>();
}
const makeCampaignNavigation = () => {
    return useNavigation<NavigationProp<MakeCampaignStackParamList>>();
}
const myPageNavigation = () => {
    return useNavigation<NavigationProp<MyPageStackParamList>>();
}
const modalNavigation = () => {
    return useNavigation<NavigationProp<ModalStackParamList>>();
}

export { mainNavigation, makeCampaignNavigation, myPageNavigation, modalNavigation }