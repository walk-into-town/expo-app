import { ip } from "./ip"
import { BaseFetchRes, Coupon, MakeCampaign, PinPoint, CampaignSearchParams, SearchCampaign, MakeCampaignComment, CampaignComment, PinPointReadParams, CouponReadParams, PartedMember, Campaign } from "@types"
import { baseFetch } from "./baseFetch"
import { formAppendImgs } from "../util";

//// 캠페인 CRUD
type CampaignCreateFetch = (body: MakeCampaign) => BaseFetchRes<string>;
export const campaignCreate: CampaignCreateFetch = (body) => {
    console.log(body)
    return baseFetch(`${ip}/campaign`, "POST", { body });
}

export const campaignUpdate = (body: MakeCampaign): BaseFetchRes<string> => {
    body.caid = body.id;
    console.log(body)
    return baseFetch(`${ip}/campaign`, "PUT", { body });
}

type CampaignDelete = (body: { uid: string, caid: string }) => BaseFetchRes<boolean>
export const campaignDelete: CampaignDelete = (body) => {
    return baseFetch(`${ip}/member/mycampaign`, "DELETE", { body })
}

export const campaignReadAll: () => BaseFetchRes<SearchCampaign[]> = () => {
    return baseFetch(`${ip}/campaign/scan`, "GET");
}

type campaignSearchFetch = (params: CampaignSearchParams) => BaseFetchRes<SearchCampaign[]>
export const campaignSearch: campaignSearchFetch = ({ condition, type, value }) => {
    return baseFetch(`${ip}/campaign?type=${type}&condition=${condition}&value=${value}`, "GET");
}
// 해당 핀포인트 ID를 가진 캠페인 찾기
export const campaignSearchPinPoint = (pid: string): BaseFetchRes<SearchCampaign> => {
    return baseFetch(`${ip}/campaign?type=pinpoint&condition=exact&value=${pid}`, "GET");
}

//// 캠페인 디테일
type CampaignParticiapte = (body: { uid: string, caid: string }) => BaseFetchRes<boolean>
export const campaignParticiapte: CampaignParticiapte = (body) => {
    return baseFetch(`${ip}/member/playing`, "POST", { body })
}
export const campaignWithdraw = (body: { uid: string, caid: string }): BaseFetchRes<boolean> => {
    return baseFetch(`${ip}/member/playing`, "DELETE", { body })
}
export const campaignCheckPlaying = (params: { uid: string, caid: string }): BaseFetchRes<boolean> => {
    return baseFetch(`${ip}/member/checkplaying?uid=${params.uid}&caid=${params.caid}`, "GET");
}
export const campaignParticiaptedUsers = (caid: string): BaseFetchRes<PartedMember[]> => {
    return baseFetch(`${ip}/campaign/playing?caid=${caid}`, "GET")
}
export const campaignIsCleared = (caid: string): BaseFetchRes<boolean> => {
    return baseFetch(`${ip}/member/checkcampaign?caid=${caid}`, "GET")
}


//// 캠페인 리뷰
type CCCFetch = (body: MakeCampaignComment) => BaseFetchRes<string>
export const campaignCommentCreate: CCCFetch = (body) => {
    const formdata = new FormData();
    formdata.append("caid", body.caid);
    formdata.append("comments[userId]", body.comments.userId);
    formdata.append("comments[text]", body.comments.text);
    formAppendImgs(formdata, body.imgs)
    formdata.append("rated", body.rated.toString())

    return baseFetch(`${ip}/campaign/review`, "POST", { body: formdata, isForm: true })
}
export const campaignCommentRead = (caid: string): BaseFetchRes<CampaignComment[]> => {
    return baseFetch(`${ip}/campaign/review?caid=${caid}`, "GET")
}
export const campaignCommentUpdate = (body: { rid: string, uid: string, caid: string, text: string, rated: number, imgs: string[] }) => {
    const formdata = new FormData();
    formdata.append("rid", body.rid);
    formdata.append("caid", body.caid);
    formdata.append("uid", body.uid);
    formdata.append("rated", body.rated.toString());
    formdata.append("text", body.text);
    formAppendImgs(formdata, body.imgs)
    return baseFetch(`${ip}/campaign/review`, "PUT", { body: formdata, isForm: true })
}
export const campaignCommentDelete = (body: { rid: string, uid: string, caid: string }): BaseFetchRes<[]> => {
    return baseFetch(`${ip}/campaign/review`, "DELETE", { body })
}

// 추천캠페인 
type campaignRecommendFetch = (region: string) => BaseFetchRes<SearchCampaign[]>
export const campaignRecommend: campaignRecommendFetch = (region) => {
    return baseFetch(`${ip}/campaign/recommend?region=${region}`, "GET");
}