import { BaseFetchRes, MemberLoginRes, ModifyMember, RegisterMember } from "@types"
import { baseFetch } from "./baseFetch"
import { ip } from "./ip"

/* user/member */
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

type MemberModifyFetch = (data: ModifyMember) => BaseFetchRes<string>
export const memberModify: MemberModifyFetch = (data) => {
    return baseFetch(`${ip}/member`, "PUT", data);
}

type MemberWithdrawFetch = (data: { id: string }) => BaseFetchRes<string>
export const memberWithdraw: MemberWithdrawFetch = (data) => {
    return baseFetch(`${ip}/member`, "DELETE", data);
}
