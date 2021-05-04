import { ip } from "./ip"
import { BaseFetchRes, Campagin, MakeCampagin, SearchCampagin } from "@types"
import { baseFetch } from "./baseFetch"


type CampaginCreateFetch = (data: MakeCampagin) => BaseFetchRes<string>;
export const campaginCreate: CampaginCreateFetch = (data) => {
    return baseFetch(`${ip}/campaign`, "POST", data);
}

export const campaginReadAll: () => BaseFetchRes<SearchCampagin[]> = () => {
    return baseFetch(`${ip}/campaign?type=name&value=금오`, "GET");
}

export const campaginSearch: (text: string) => BaseFetchRes<SearchCampagin[]> = (text) => {
    return baseFetch(`${ip}/campaign?type=name&value=${text}`, "GET");
}