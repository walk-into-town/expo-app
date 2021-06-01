import { ip } from "./ip"
import { BaseFetchRes, Coupon, MakeCampaign, PinPoint, CampaignSearchParams, SearchCampaign, MakeCampaignComment, CampaignComment, PinPointReadParams, CouponReadParams, PlayingCampaign, Campaign } from "@types"
import { baseFetch } from "./baseFetch"


type CampaignCreateFetch = (body: MakeCampaign) => BaseFetchRes<string>;
export const campaignCreate: CampaignCreateFetch = (body) => {
    return baseFetch(`${ip}/campaign`, "POST", { body });
}

export const campaignReadAll: () => BaseFetchRes<SearchCampaign[]> = () => {
    return baseFetch(`${ip}/campaign/scan`, "GET");
}

type campaignSearchFetch = (params: CampaignSearchParams) => BaseFetchRes<SearchCampaign[]>
export const campaignSearch: campaignSearchFetch = ({ condition, type, value }) => {
    return baseFetch(`${ip}/campaign?type=${type}&condition=${condition}&value=${value}`, "GET");
}

type campaignSearchOneFetch = (params: CampaignSearchParams) => BaseFetchRes<SearchCampaign>
export const campaignSearchOne: campaignSearchOneFetch = ({ condition, type, value }) => {
    return baseFetch(`${ip}/campaign?type=${type}&condition=${condition}&value=${value}`, "GET");
}

// 캠페인 디테일 페이지
type CampaignParticiapte = (body: { uid: string, caid: string }) => BaseFetchRes<boolean>
export const campaignParticiapte: CampaignParticiapte = (body) => {
    return baseFetch(`${ip}/member/playing`, "POST", { body })
}
export const campaignCheckPlaying = (params: { uid: string, caid: string }): BaseFetchRes<string> => {
    return baseFetch(`${ip}/member/checkplaying?uid=${params.uid}&caid=${params.caid}`, "GET");
}

type PinPointReadFetch = (params: PinPointReadParams) => BaseFetchRes<PinPoint[]>
export const pinPointRead: PinPointReadFetch = (params) => {
    return baseFetch(`${ip}/pinpoint?type=${params.type}&value=${params.value}`, "GET");
}

type CouponReadFetch = (params: CouponReadParams) => BaseFetchRes<Coupon[]>
export const couponRead: CouponReadFetch = (params) => {
    return baseFetch(`${ip}/coupon?type=${params.type}&value=${params.value}`, "GET");
}

// 캠페인 리뷰
type CCCFetch = (body: MakeCampaignComment) => BaseFetchRes<string>
export const campaignCommentCreate: CCCFetch = (body) => {
    return baseFetch(`${ip}/campaign/review`, "POST", { body })
}
export const campaignCommentRead = (caid: string): BaseFetchRes<CampaignComment[]> => {
    return baseFetch(`${ip}/campaign/review?caid=${caid}`, "GET")
}
export const campaignCommentUpdate = (body: { coid: string, uid: string, caid: string, text: string, rated: number, imgs: string[] }) => {
    return baseFetch(`${ip}/campaign/review`, "PUT", { body })
}
export const campaignCommentDelete = (body: { coid: string, uid: string, caid: string }): BaseFetchRes<[]> => {
    return baseFetch(`${ip}/campaign/review`, "DELETE", { body })
}

