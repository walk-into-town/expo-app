import { BaseFetchRes } from "@types";
import useFetch from "../useHook/useFetch";
import { baseFetch } from "./baseFetch";
import { ip } from "./ip";
import { formAppendImgs } from "../util";
import * as Location from 'expo-location';

import * as member from "./member";
import * as campaign from "./campaign";
import * as pinpoint from "./pinpoint";
import * as game from "./game";
import * as coupons from "./coupons";

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
    if (res.ok === false)
        return await res.text();
    return await res.json();
}

const sendFile = (body: string[]): BaseFetchRes<string[]> => {
    const formData = new FormData();
    formAppendImgs(formData, body)
    return baseFetch(`${ip}/file`, "POST", { body: formData, isForm: true });
}

const getCoordinate = async() =>{
    await Location.requestPermissionsAsync();
    return await Location.getCurrentPositionAsync();
}

export const API = {
    debugSendImg,
    sendFile,
    getCoordinate,
    ...member,
    ...campaign,
    ...pinpoint,
    ...game,
    ...coupons
}