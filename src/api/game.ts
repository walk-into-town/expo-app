import { BaseFetchRes, RankMember, ResCoupon } from "@types";
import { baseFetch } from "./baseFetch";
import { ip } from "./ip";

export const monsterRead = (): BaseFetchRes<string> => {
    // const randomNum = Math.random() * 1000 + 1;
    return baseFetch(`${ip}/monster/img?number=${100}`, "GET");
}

export const quizRead = (pid: string): BaseFetchRes<any> => {
    return baseFetch(`${ip}/member?pid=${pid}`, "GET");
}

interface quizCheck {
    pid: string,
    caid: string,
    answer: string
}
export const quizCheck = (body: quizCheck): BaseFetchRes<ResCoupon> => {
    return baseFetch(`${ip}/pinpoint/quiz/check`, "POST", { body });
}


// 랭킹
export const rankRead = (type: 'list' | 'single'): BaseFetchRes<RankMember[]> => {
    return baseFetch(`${ip}/game/ranking?type=${type}`, "GET");
}
export const rankReadMy = (): BaseFetchRes<RankMember> => {
    return baseFetch(`${ip}/game/myranking`, "GET");
}