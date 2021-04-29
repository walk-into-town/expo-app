import { RegisterMember, ModifyMember, MemberLoginFetchRes, MemberLogoutFetchRes, MemberRegisterFetchRes, MemberModifyFetchRes, MemberWithdrawFetchRes } from "@types"
import { baseFetch } from "./baseFetch"
import { ip } from "./ip"
import useFetch from "./useFetch"



/* user/member */
export const memberLogin: MemberLoginFetchRes = async (data) => {
    return baseFetch(`${ip}/member/login`, "POST", data);
}

export const memberLogout: MemberLogoutFetchRes = (data) => {
    return baseFetch(`${ip}/member/logout`, "POST", data);
}
 
export const memberRegister: MemberRegisterFetchRes = async(data) => {
    return baseFetch(`${ip}/member/register`, "POST", data);
}

export const memberModify: MemberModifyFetchRes = (data) => {
    return useFetch(`${ip}/member/modify`, {
        method: "POST",
        body: JSON.stringify(data)
    })
}

export const memberWithdraw: MemberWithdrawFetchRes = (data) => {
    return useFetch(`${ip}/member/withdraw`, {
        method: "POST",
        body: JSON.stringify(data)
    })
}
