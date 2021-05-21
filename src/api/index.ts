import useFetch from "../useHook/useFetch";

export const getRandomCat = () => {
    return useFetch("http://aws.random.cat/meow");
}

const debugSendImg = (data: FormData): BaseFetchRes<string> => {
    return baseFetch(`https://walk-into-town.kro.kr/debug/file`, "POST", data, true)
}

import * as member from "./member";
import * as campaign from "./campaign";
import * as pinpoint from "./pinpoint";
import { baseFetch } from "./baseFetch";
import { BaseFetchRes } from "@types";

export const API = {
    debugSendImg,
    ...member,
    ...campaign,
    ...pinpoint
}