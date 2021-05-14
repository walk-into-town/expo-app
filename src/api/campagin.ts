import { ip } from "./ip"
import { ApiSearchParams, BaseFetchRes, Campagin, Coupon, MakeCampagin, PinPoint, SearchCampagin } from "@types"
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

// 미리 생성
type CampaginParticiapte = (data: { userId: string, camId: string }) => BaseFetchRes<boolean>
export const campaginParticiapte: CampaginParticiapte = (data) => {
    return baseFetch(`${ip}/campagin/particiapte`, "POST")
}

type PinPointReadFetch = (data: ApiSearchParams) => BaseFetchRes<PinPoint[]>
export const pinPointRead: PinPointReadFetch = (data) => {
    return baseFetch(`${ip}/campagin/pinpoint?type${data.type}&id=${data.id}`, "GET");
}

type CouponReadFetch = (data: ApiSearchParams) => BaseFetchRes<Coupon[]>
export const couponRead: CouponReadFetch = (data) => {
    return baseFetch(`${ip}/campagin/coupon?type${data.type}&id=${data.id}`, "GET");
}