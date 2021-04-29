

export const baseFetch = async (route: string, method: "POST" | "GET" | "PUT" | "DELETE", body?: any) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    try {
        const res = await fetch(route, {
            method: method,
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
            signal: controller.signal
        });
        return await res.json();
    } catch (e) {
        console.log("baseFetch 에러", e);
        return { result: "failed", error: e.toString() };
    } finally {
        clearTimeout(timeoutId);
    }
}