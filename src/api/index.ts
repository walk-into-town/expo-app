import useFetch from "./useFetch"

export const getRandomCat = () => {
    return useFetch("http://aws.random.cat/meow");
}