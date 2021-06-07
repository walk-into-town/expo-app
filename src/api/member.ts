import { BaseFetchRes, MakeReport, MemberInfoRes, MemberLoginRes, ModifyMember, MyCampaign, PinPoint, PlayingCampaign, PlayingPinPoint, RegisterMember, Report } from "@types"
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

export const memberWithdraw = (): BaseFetchRes<string> => {
    return baseFetch(`${ip}/member`, "DELETE");
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

export const memberPlayingPinPoint = (): BaseFetchRes<PlayingPinPoint> => {
    return baseFetch(`${ip}/member/playing/pinpoint`, "GET");
}
export const pinpointPlayingRead = (): BaseFetchRes<{
    clearedPinpoins: string[],
    pinpoints: PinPoint[]
}> => {
    return baseFetch(`${ip}/member/playing/pinpoint`, "GET")
}

// 댓글 신고
export const managerReport = (body: MakeReport): BaseFetchRes<string> => {
    return baseFetch(`${ip}/manager/report`, "POST", { body })
}
export const getReport = (uid: string): BaseFetchRes<Report[]> => {
    return baseFetch(`${ip}/manager/report?type=userId&value=${uid}`, "GET")
}