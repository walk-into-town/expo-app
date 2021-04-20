import { Member, ModifyMember } from "@types"
import { ip } from "./ip"
import useFetch from "./useFetch"

/* user/member */
export const login = (id: string, pw: string) => {
    return useFetch(`${ip}/member/login?id=${id}&pw=${pw}`)
}

export const logout = (id: string) => {
    return useFetch(`${ip}/member/logout?id=${id}`)
}

export const register = (data:Member) => {
    return useFetch(`${ip}/member/register`, {
        method: "POST",
        body: JSON.stringify(data)
    })
}

export const modifyMember = (data:ModifyMember) => {
    return useFetch(`${ip}/member/modify`, {
        method: "POST",
        body: JSON.stringify(data)
    })
}

export const withdrawMember = (data:{id:string, pw:string}) => {
    return useFetch(`${ip}/member/withdraw`, {
        method: "POST",
        body: JSON.stringify(data)
    })
}
