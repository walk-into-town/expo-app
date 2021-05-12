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
        if(res.status === 404)
            throw new Error(await res.text())
        if(res.status === 400)
            throw new Error("응답 400 에러")

        return await res.json();
    } catch (e) {
        console.log("baseFetch 에러", e);
        return { result: "failed", error: e.toString() };
    } finally {
        clearTimeout(timeoutId);
    }
}