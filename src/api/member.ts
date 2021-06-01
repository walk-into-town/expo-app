import { BaseFetchRes, Campaign, MemberInfoRes, MemberLoginRes, ModifyMember, MyCampaign, PinPoint, PlayingCampaign, RegisterMember, SessionRes } from "@types"
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

type MemberModifyFetch = (body: ModifyMember) => BaseFetchRes<{
    profileImg: string,
}>
export const memberModify: MemberModifyFetch = (body) => {
    if(body.img)
        console.log('isForm true')
    console.log(body.img)
    return baseFetch(`${ip}/member`, "PUT", { body, isForm: true });
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
    return baseFetch(`${ip}/member/mycampaign?id=${userId}`, "GET");
}

export const memberPlayingCampaignPinpoint = (): BaseFetchRes<PinPoint[]> => {
    return baseFetch(`${ip}/member/playing/pinpoint`, "GET");
}
