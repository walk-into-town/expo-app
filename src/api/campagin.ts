import { ip } from "./ip"
import { BaseFetchRes, Campagin, Coupon, MakeCampagin, PinPoint, SearchCampagin } from "@types"
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


type PinPointReadFetch = (data: { type: "list" | "single", id: string },) => BaseFetchRes<PinPoint[]>
export const pinPointRead: PinPointReadFetch = (data) => {
    return baseFetch(`${ip}/campagin/pinpoint?type${data.type}&id=${data.id}`, "GET");
}

type CouponReadFetch = (data: string[]) => BaseFetchRes<Coupon[]>
export const couponRead: CouponReadFetch = (data) => {
    // var url = new URL(`${ip}/campagin/pinpoint`);
    // const params = data.map(v => { return [ "id", v ] })
    // url.search = new URLSearchParams(params).toString();
    // console.log(url)
    return baseFetch(`${ip}/campagin/coupon`, "GET");
}