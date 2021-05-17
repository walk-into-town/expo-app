import { ip } from "./ip"
import { ApiSearchParams, BaseFetchRes, Coupon, MakeCampaign, PinPoint, CampaginSearchParams, SearchCampaign } from "@types"
import { baseFetch } from "./baseFetch"


type CampaignCreateFetch = (data: MakeCampaign) => BaseFetchRes<string>;
export const campaginCreate: CampaignCreateFetch = (data) => {
    return baseFetch(`${ip}/campaign`, "POST", data);
}

export const campaginReadAll: () => BaseFetchRes<SearchCampaign[]> = () => {
    return baseFetch(`${ip}/campaign/scan`, "GET");
}

type CampaginSearchFetch = (params: CampaginSearchParams) => BaseFetchRes<SearchCampaign[]>
export const campaginSearch: CampaginSearchFetch = ({ condition, type, value }) => {
    return baseFetch(`${ip}/campaign?type=${type}&condition=${condition}&value=${value}`, "GET");
}

type CampaignParticiapte = (data: { uid: string, cid: string }) => BaseFetchRes<boolean>
export const campaginParticiapte: CampaignParticiapte = (data) => {
    console.log("=====data", data)
    return baseFetch(`${ip}/campaign/particiapte/campaign`, "POST", data)
}

type PinPointReadFetch = (data: ApiSearchParams) => BaseFetchRes<PinPoint[]>
export const pinPointRead: PinPointReadFetch = (data) => {
    return baseFetch(`${ip}/campaign/pinpoint?type=${data.type}&id=${data.id}`, "GET");
}

type CouponReadFetch = (data: ApiSearchParams) => BaseFetchRes<Coupon[]>
export const couponRead: CouponReadFetch = (data) => {
    return baseFetch(`${ip}/campaign/coupon?type=${data.type}&id=${data.id}`, "GET");
}