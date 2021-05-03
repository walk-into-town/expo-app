import useFetch from "../useHook/useFetch";

export const getRandomCat = () => {
    return useFetch("http://aws.random.cat/meow");
}

import { memberLogin, memberLogout, memberModify, memberRegister, memberWithdraw } from "./member";
import { campaginCreate, campaginReadAll } from "./campagin"

export const API = {
    memberLogin, memberLogout, memberModify, memberRegister, memberWithdraw,
    campaginCreate, campaginReadAll
}