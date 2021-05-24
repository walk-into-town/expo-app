// 200: 요청 처리 완료
// 201: 자원 생성 요청 처리 완료

// 400: 잘못된 요청
// 401: 권한 없는 자원 요청

// 500: 알수없는 에러
// 521: DB에러

const baseHeader = {
    Accept: "application/json",
    'Content-Type': 'application/json',
}
const formHeader = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
}
type fetchOptions = {
    body?: any,
    isForm?: boolean,
    waitTime?: number
}
type fetch = (route: string, method: "POST" | "GET" | "PUT" | "DELETE", options?: fetchOptions) => Promise<any>
export const baseFetch: fetch = async (route, method, options = {}) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options.waitTime || 4000);

    try {
        const res = await fetch(route, {
            method: method,
            body: JSON.stringify(options.body),
            headers: options.isForm ? formHeader : baseHeader,
            signal: controller.signal,
        });

        if (res.ok === false) {
            console.log(await res.text())
            throw new Error(`응답 코드 [${res.status}] 에러`)
        }

        return await res.json();
    } catch (e) {
        console.log("baseFetch 에러", e);
        return { result: "failed", error: e.toString() };
    } finally {
        clearTimeout(timeoutId);
    }
}