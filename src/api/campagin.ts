import { ip } from "./ip"
import { BaseFetchRes, Campagin, MakeCampagin } from "@types"
import { baseFetch } from "./baseFetch"


type CampaginCreateFetch = (data: MakeCampagin) => BaseFetchRes<string>;
export const campaginCreate: CampaginCreateFetch = (data) => {
    return baseFetch(`${ip}/campaign`, "POST", data);
}

export const campaginReadAll: () => BaseFetchRes<Campagin[]> = () => {
    return baseFetch(`${ip}/campaign`, "GET");
}