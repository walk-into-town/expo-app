import useFetch from "./useFetch"

export const getRandomCat = () => {
    return useFetch("http://aws.random.cat/meow");
}
import { login, logout, modifyMember, register, withdrawMember } from "./member";
export { login, logout, modifyMember, register, withdrawMember }