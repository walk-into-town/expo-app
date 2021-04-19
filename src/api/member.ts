import { ModifyMember } from "@types"
import { ip } from "./ip"
import useFetch from "./useFetch"

/* user */
export const login = (id: string, pw: string) => {
    return useFetch(`${ip}/member/login?id=${id}&pw=${pw}`)
}

export const logout = (id: string) => {
    return useFetch(`${ip}/member/logout?id=${id}`)
}

export const modifyMember = (props:ModifyMember) => {
    return useFetch(`${ip}/member/modify`, {
        method: "POST",
        body: JSON.stringify(props)
    })
}

export const withdrawMember = (props:{id:string, pw:string}) => {
    return useFetch(`${ip}/member/withdraw`, {
        method: "POST",
        body: JSON.stringify(props)
    })
}
