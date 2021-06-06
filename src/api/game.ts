import { BaseFetchRes, QuizClear, RankMember, ResCoupon } from "@types";
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
    answer: string,
    monsterImg: string
}
export const quizSolve = (body: quizCheck): BaseFetchRes<any> => {
    return baseFetch(`${ip}/pinpoint/quiz/solve`, "POST", { body });
}
export const quizCheck = ({ pid, caid }: { pid: string, caid: string }): BaseFetchRes<any> => {
    return baseFetch(`${ip}/pinpoint/quiz/check?pid=${pid}&caid=${caid}`, "GET");
}


// 랭킹
export const rankRead = (type: 'list' | 'single'): BaseFetchRes<RankMember[]> => {
    return baseFetch(`${ip}/game/ranking?type=${type}`, "GET");
}
export const rankReadMy = (): BaseFetchRes<RankMember> => {
    return baseFetch(`${ip}/game/myranking`, "GET");
}