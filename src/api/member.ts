import { RegisterMember, ModifyMember, MemberLoginFetchRes, MemberLogoutFetchRes, MemberRegisterFetchRes, MemberModifyFetchRes, MemberWithdrawFetchRes } from "@types"
import { ip } from "./ip"
import useFetch from "./useFetch"



/* user/member */
export const memberLogin: MemberLoginFetchRes = async (data) => {

    try {
        const res = await fetch(`${ip}/member/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const json = res.json();
        return json;
    } catch (e) {
        console.log(e)
    }
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
