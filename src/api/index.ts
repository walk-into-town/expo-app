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

//// 주소
const getCoordinate = async () => {
    await Location.requestForegroundPermissionsAsync();
    return await Location.getCurrentPositionAsync();
}

// 좌표 -> 주소반환 api
export const getRegion = async (params: { latitude: number, longitude: number }): Promise<string> => {
    const res = await baseFetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${params.latitude},${params.longitude}&language=ko&key=AIzaSyA-4i3FV1KLsJbsyVySpYi4YIwxIkEXFlw`, "GET");
    if (res === undefined)
        return ""

    const fullAddress = res.results[0].formatted_address
    const splitAddress = fullAddress.split(" ");
    return splitAddress[1].charAt(splitAddress.length - 1) === "시" ? splitAddress[1] : splitAddress[2];
}

export const API = {
    debugSendImg,
    sendFile,
    getCoordinate,
    getRegion,
    ...member,
    ...campaign,
    ...pinpoint,
    ...game,
    ...coupons
}