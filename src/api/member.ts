import { RegisterMember, ModifyMember, MemberLoginFetchRes, MemberLogoutFetchRes, MemberRegisterFetchRes, MemberModifyFetchRes, MemberWithdrawFetchRes } from "@types"
import { ip } from "./ip"
import useFetch from "./useFetch"



/* user/member */
export const memberLogin: MemberLoginFetchRes = (id, pw) => {
    return useFetch(`${ip}/member/login?id=${id}&pw=${pw}`)
}

export const memberLogout: MemberLogoutFetchRes = (id) => {
    return useFetch(`${ip}/member/logout?id=${id}`)
}


export const memberRegister: MemberRegisterFetchRes = (data) => {
    return useFetch(`${ip}/member/register`, {
        method: "POST",
        body: JSON.stringify(data)
    })
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
