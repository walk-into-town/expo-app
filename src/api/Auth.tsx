import { Iauth } from "@types";
import { createContext, useContext } from "react";

const AuthContext = createContext<Iauth | null>(null);

const useAuth = () => {
    const auth = useContext(AuthContext);
    if (!auth)
        throw new Error('Cannot find AuthContext');

    return auth;
}

export { AuthContext, useAuth }