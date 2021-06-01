import { BaseFetchRes, MemberInfoRes, MemberLoginRes, ModifyMember, MyCampaign, PlayingCampaign, RegisterMember } from "@types"
import { formAppendImg, formAppendImgs } from "../util"
import { baseFetch } from "./baseFetch"
import { ip } from "./ip"

// 로그인
type MemberLoginFetch = (body: { id: string, pw: string }) => BaseFetchRes<MemberLoginRes>
export const memberLogin: MemberLoginFetch = async (body) => {
    return baseFetch(`${ip}/member/login`, "POST", { body });
}

type MemberLogoutFetch = (body: { id: string }) => BaseFetchRes<string>
export const memberLogout: MemberLogoutFetch = (body) => {
    return baseFetch(`${ip}/member/logout`, "DELETE", { body });
}

type MemberRegisterFetch = (body: RegisterMember) => BaseFetchRes<string>
export const memberRegister: MemberRegisterFetch = async (body) => {
    return baseFetch(`${ip}/member`, "POST", { body });
}

// 마이페이지 
type MemberInfoReadFetch = (params: { id: string }) => BaseFetchRes<MemberInfoRes>
export const memberInfoRead: MemberInfoReadFetch = (params) => {
    return baseFetch(`${ip}/member?id=${params.id}`, "GET");
}

type MemberModifyFetch = (body: ModifyMember) => BaseFetchRes<{ profileImg: string }>
export const memberModify: MemberModifyFetch = (body) => {
    const formdata = new FormData();
    formdata.append('uid', body.uid);
    formdata.append('nickname', body.nickname);
    formdata.append('selfIntroduction', body.selfIntroduction);
    formAppendImg(formdata, body.img);
    return baseFetch(`${ip}/member`, "PUT", { body: formdata, isForm: true });
}

type MemberWithdrawFetch = (body: { id: string }) => BaseFetchRes<string>
export const memberWithdraw: MemberWithdrawFetch = (body) => {
    return baseFetch(`${ip}/member`, "DELETE", { body });
}

// 나의 캠페인 정보
type MemberPlayingcampaignFetch = (userId: string) => BaseFetchRes<PlayingCampaign[]>
export const memberPlayingCampaign: MemberPlayingcampaignFetch = (userId) => {
    return baseFetch(`${ip}/member/playing?uid=${userId}`, "GET");
}

type MemberMycampaignFetch = (userId: string) => BaseFetchRes<MyCampaign[]>
export const memberMyCampaign: MemberMycampaignFetch = (userId) => {
    return baseFetch(`${ip}/member/mycampaign?uid=${userId}`, "GET");
}
