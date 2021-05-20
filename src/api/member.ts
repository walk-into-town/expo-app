import { BaseFetchRes, MemberInfoRes, MemberLoginRes, ModifyMember, RegisterMember } from "@types"
import { baseFetch } from "./baseFetch"
import { ip } from "./ip"

// 로그인
type MemberLoginFetch = (data: { id: string, pw: string }) => BaseFetchRes<MemberLoginRes>
export const memberLogin: MemberLoginFetch = async (data) => {
    return baseFetch(`${ip}/member/login`, "POST", data);
}

type MemberLogoutFetch = (data: { id: string }) => BaseFetchRes<string>
export const memberLogout: MemberLogoutFetch = (data) => {
    return baseFetch(`${ip}/member/logout`, "DELETE", data);
}

type MemberRegisterFetch = (data: RegisterMember) => BaseFetchRes<string>
export const memberRegister: MemberRegisterFetch = async (data) => {
    return baseFetch(`${ip}/member`, "POST", data);
}

// 마이페이지 
type MemberInfoReadFetch = (data: { id: string }) => BaseFetchRes<MemberInfoRes>
export const memberInfoRead: MemberInfoReadFetch = (data) => {
    return baseFetch(`${ip}/member?id=${data.id}`, "GET");
}

type MemberModifyFetch = (data: ModifyMember) => BaseFetchRes<string>
export const memberModify: MemberModifyFetch = (data) => {
    return baseFetch(`${ip}/member`, "PUT", data);
}

type MemberWithdrawFetch = (data: { id: string }) => BaseFetchRes<string>
export const memberWithdraw: MemberWithdrawFetch = (data) => {
    return baseFetch(`${ip}/member`, "DELETE", data);
}
