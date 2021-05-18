import useFetch from "../useHook/useFetch";

export const getRandomCat = () => {
    return useFetch("http://aws.random.cat/meow");
}

import * as member from "./member";
import * as campaign from "./campaign"

export const API = {
    ...member,
    ...campaign
}