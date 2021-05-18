import { ip } from "./ip"
import { ApiSearchParams, BaseFetchRes, Coupon, MakeCampaign, PinPoint, CampaignSearchParams, SearchCampaign, MakeCampaignComment } from "@types"
import { baseFetch } from "./baseFetch"


type CampaignCreateFetch = (data: MakeCampaign) => BaseFetchRes<string>;
export const campaignCreate: CampaignCreateFetch = (data) => {
    return baseFetch(`${ip}/campaign`, "POST", data);
}

export const campaignReadAll: () => BaseFetchRes<SearchCampaign[]> = () => {
    return baseFetch(`${ip}/campaign/scan`, "GET");
}

type campaignSearchFetch = (params: CampaignSearchParams) => BaseFetchRes<SearchCampaign[]>
export const campaignSearch: campaignSearchFetch = ({ condition, type, value }) => {
    return baseFetch(`${ip}/campaign?type=${type}&condition=${condition}&value=${value}`, "GET");
}

// 캠페인 디테일 페이지

type CampaignParticiapte = (data: { uid: string, cid: string }) => BaseFetchRes<boolean>
export const campaignParticiapte: CampaignParticiapte = (data) => {
    return baseFetch(`${ip}/campaign/particiapte/campaign`, "PUT", data)
}

type PinPointReadFetch = (data: ApiSearchParams) => BaseFetchRes<PinPoint[]>
export const pinPointRead: PinPointReadFetch = (data) => {
    return baseFetch(`${ip}/campaign/pinpoint?type=${data.type}&id=${data.id}`, "GET");
}

type CouponReadFetch = (data: ApiSearchParams) => BaseFetchRes<Coupon[]>
export const couponRead: CouponReadFetch = (data) => {
    return baseFetch(`${ip}/campaign/coupon?type=${data.type}&id=${data.id}`, "GET");
}

type CCCFetch = (data: MakeCampaignComment) => BaseFetchRes<string>
export const campaignCommentCreate: CCCFetch = (data) => {
    return baseFetch(`${ip}/campaign/comment`, "POST", data)
}