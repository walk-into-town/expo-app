import { DefaultAlert } from "../atoms";

export const baseFetch = async (route: string, method: "POST" | "GET" | "PUT" | "DELETE", body?: any) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    try {
        const res = await fetch(route, {
            method: method,
            body: JSON.stringify(body),
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
            },
            signal: controller.signal,
        });
        // 400: 요청 에러(사용자에게 문제), 401: DB 에러, 402: 알 수 없음
        if (res.ok === false && res.status !== 400) {
            console.log(await res.text())
            throw new Error(`응답 코드 [${res.status}] 에러`)
        }

        return await res.json();
    } catch (e) {
        DefaultAlert({ title: "통신 오류" })
        console.log(`[baseFetch 오류] ${e.toString()}`)
        return { result: "failed", error: e.toString() };
    } finally {
        clearTimeout(timeoutId);
    }
}