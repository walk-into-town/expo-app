export const baseFetch = async (route: string, method: "POST" | "GET" | "PUT" | "DELETE", body?: any) => {
    try {
        const res = await fetch(route, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: method,
            body: JSON.stringify(body),
        })
        return await res.json();
    } catch (e) {
        console.log(e)
    }
}