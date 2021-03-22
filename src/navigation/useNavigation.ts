import { NavigationProp, useNavigation } from "@react-navigation/core";
import { CampaginStackParamList } from "@types";


const campgainNavigation = () => {
    return useNavigation<NavigationProp<CampaginStackParamList>>();
}
export { campgainNavigation }