import { BaseFetchRes, PinPointComment } from "@types";
import { baseFetch } from "./baseFetch";
import { ip } from "./ip";

// 핀포인트 댓글
type pCommentCreateFetch = (body: {
    pid: string,
    comments: {
        userId: string,
        text: string
    },
    imgs: string[]
}) => BaseFetchRes<PinPointComment>
export const pinpointCommentCreate: pCommentCreateFetch = (body) => {
    return baseFetch(`${ip}/pinpoint/comment`, "POST", {
        body,
        isForm: body.imgs.length > 0
    });
}

export const pinpointCommentRead = (pid: string): BaseFetchRes<PinPointComment[]> => {
    return baseFetch(`${ip}/pinpoint/comment?pid=${pid}`, "GET");
}

type pCommentUpdateFetch = (body: {
    coid: string,
    uid: string,
    pid: string,
    text: string
}) => BaseFetchRes<PinPointComment>
export const pinpointCommentUpdate: pCommentUpdateFetch = (body) => {
    return baseFetch(`${ip}/pinpoint/comment`, "PUT", { body });
}

type pCommentDeleteFetch = (body: {
    coid: string,
    uid: string,
    pid: string
}) => BaseFetchRes<PinPointComment>
export const pinpointCommentDelete: pCommentDeleteFetch = (body) => {
    return baseFetch(`${ip}/pinpoint/comment`, "DELETE", { body });
}

type pCommentRateFetch = (body: {
    coid: string,
    uid: string,
    pid: string,
    like: boolean
}) => BaseFetchRes<PinPointComment>
export const pinpointCommentRate: pCommentRateFetch = (body) => {
    return baseFetch(`${ip}/pinpoint/comment/rate`, "PUT", { body });
}