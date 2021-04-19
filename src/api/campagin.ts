import { ip } from "./ip"
import useFetch from "./useFetch"

export const addCampagin = () => {
    return useFetch(`${ip}//campaign/register`, {
        method: "POST",
        
    })
}