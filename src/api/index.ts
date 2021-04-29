import useFetch from "./useFetch"

export const getRandomCat = () => {
    return useFetch("http://aws.random.cat/meow");
}
import { memberLogin, memberLogout, memberModify, memberRegister, memberWithdraw } from "./member";

export const API = {
    memberLogin, memberLogout, memberModify, memberRegister, memberWithdraw,
}