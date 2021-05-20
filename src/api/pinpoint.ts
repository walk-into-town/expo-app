import { BaseFetchRes, PinPointComment } from "@types";
import { baseFetch } from "./baseFetch";
import { ip } from "./ip";

// 핀포인트 댓글
type pCommentCreateFetch = (data: {
    pid: string,
    "comments[userId]": string,
    "comments[text]": string,
    img?: string
}) => BaseFetchRes<PinPointComment>
export const pinpointCommentCreate: pCommentCreateFetch = (data) => {
    return baseFetch(`${ip}/campaign/evaluate/pinpoint/comment`, "POST", data);
}

type pCommentReadFetch = (pid: string) => BaseFetchRes<PinPointComment[]>
export const pinpointCommentRead: pCommentReadFetch = (pid) => {
    return baseFetch(`${ip}/campaign/evaluate/pinpoint/comment?id=${pid}`, "GET");
}

type pCommentUpdateFetch = (data: {
    cid: string,
    uid: string,
    pid: string,
    text: string
}) => BaseFetchRes<PinPointComment>
export const pinpointCommentUpdate: pCommentUpdateFetch = (data) => {
    return baseFetch(`${ip}/campaign/evaluate/pinpoint/comment`, "PUT", data);
}


type pCommentDeleteFetch = (data: {
    cid: string,
    uid: string,
    pid: string
}) => BaseFetchRes<PinPointComment>
export const pinpointCommentDelete: pCommentDeleteFetch = (data) => {
    return baseFetch(`${ip}/campaign/evaluate/pinpoint/comment`, "DELETE", data);
}


type pCommentRateFetch = (data: {
    cid: string,
    uid: string,
    pid: string,
    like: boolean
}) => BaseFetchRes<PinPointComment>
export const pinpointCommentRate: pCommentRateFetch = (data) => {
    return baseFetch(`${ip}/campaign/evaluate/pinpoint/comment/rate`, "PUT", data);
}