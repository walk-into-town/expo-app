export const baseFetch = async (route: string, method: "POST" | "GET" | "PUT" | "DELETE", body?: any) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    try {
        const res = await fetch(route, {
            credentials: "same-origin",
            method: method,
            body: JSON.stringify(body),
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
            },
            signal: controller.signal
        });
        // console.log(await res.text()) // JSON Parse error: Unrecognized token '<' 일 때 에러 코드 보는 용도
        return await res.json();
    } catch (e) {
        console.log("baseFetch 에러", e);
        return { result: "failed", error: e.toString() };
    } finally {
        clearTimeout(timeoutId);
    }
}