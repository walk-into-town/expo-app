import { useEffect, useState } from "react";

const useFetch = (url: RequestInfo, opts?: RequestInit) => {

    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [trigger, setTrigger] = useState(0);

    opts = {
        ...opts,
        headers: {
            'Content-Type': 'application/json'
        },
    }

    const refetch = () => {
        setLoading(true);
        setTrigger(new Date().getTime());
    }

    const gofetch = async () => {
        try {
            const res = await fetch(url, opts);
            const json = await res.json();
            if (res.status === 400)
                throw new Error(json.error)

            setData(json);
        } catch (error) {
            setErr(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        gofetch();
    }, [trigger]);

    return { data, loading, err, refetch };

}
export default useFetch;