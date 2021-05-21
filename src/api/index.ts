import useFetch from "../useHook/useFetch";

export const getRandomCat = () => {
    return useFetch("http://aws.random.cat/meow");
}

const debugSendImg = async (data: FormData) => {
    const res = await fetch(`https://walk-into-town.kro.kr/debug/file`, {
        method: "POST",
        body: data,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        }
    })
    if(res.ok === false)
        return await res.text();
    return await res.json();
}

import * as member from "./member";
import * as campaign from "./campaign";
import * as pinpoint from "./pinpoint";

export const API = {
    debugSendImg,
    ...member,
    ...campaign,
    ...pinpoint
}