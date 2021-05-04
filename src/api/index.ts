import useFetch from "../useHook/useFetch";

export const getRandomCat = () => {
    return useFetch("http://aws.random.cat/meow");
}

import * as member from "./member";
import * as campagin from "./campagin"

export const API = {
    ...member,
    ...campagin
}