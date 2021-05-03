import { ip } from "./ip"
import { BaseFetchRes, MakeCampagin } from "@types"
import { baseFetch } from "./baseFetch"


type CampaginCreateFetch = (data: MakeCampagin) => BaseFetchRes<string>;
export const campaginCreate: CampaginCreateFetch = (data) => {
    return baseFetch(`${ip}/campaign`, "POST", data);
}