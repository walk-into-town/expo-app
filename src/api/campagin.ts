import { ip } from "./ip"
import { ApiSearchParams, BaseFetchRes, Campaign, Coupon, MakeCampaign, PinPoint, SearchCampaign } from "@types"
import { baseFetch } from "./baseFetch"


type CampaignCreateFetch = (data: MakeCampaign) => BaseFetchRes<string>;
export const campaginCreate: CampaignCreateFetch = (data) => {
    return baseFetch(`${ip}/campaign`, "POST", data);
}

export const campaginReadAll: () => BaseFetchRes<SearchCampaign[]> = () => {
    return baseFetch(`${ip}/campaign?type=name&value=금오`, "GET");
}

export const campaginSearch: (text: string) => BaseFetchRes<SearchCampaign[]> = (text) => {
    return baseFetch(`${ip}/campaign?type=name&value=${text}`, "GET");
}

// 미리 생성
type CampaignParticiapte = (data: { userId: string, camId: string }) => BaseFetchRes<boolean>
export const campaginParticiapte: CampaignParticiapte = (data) => {
    return baseFetch(`${ip}/campagin/particiapte`, "POST")
}

type PinPointReadFetch = (data: ApiSearchParams) => BaseFetchRes<PinPoint[]>
export const pinPointRead: PinPointReadFetch = (data) => {
    return baseFetch(`${ip}/campaign/pinpoint?type=${data.type}&id=${data.id}`, "GET");
}

type CouponReadFetch = (data: ApiSearchParams) => BaseFetchRes<Coupon[]>
export const couponRead: CouponReadFetch = (data) => {
    return baseFetch(`${ip}/campaign/coupon?type=${data.type}&id=${data.id}`, "GET");
}