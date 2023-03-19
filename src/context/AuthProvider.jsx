import { createContext, useState, useEffect } from "react";
import { generateUserId } from "../helpers/generateId.js";

const AuthContext = createContext();

function AuthProvider({ children }) {

    const [auth, setAuth] = useState({});
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    const login = (username) => {

        const id = generateUserId();
        const userData = {
            id,
            username
        }

        setAuth(userData);

        sessionStorage.setItem('user', JSON.stringify(userData));
    }

    const authUser = (userData) => {
        setAuth(userData);
        setIsLoadingUser(false);
    }

    const checkUser = () => {
        const userData = JSON.parse(sessionStorage.getItem('user'));
        if(!userData) {
            setIsLoadingUser(false);
            return;
        }

        authUser(userData);
    }

    const resetUser = () => {
        setAuth({});
        sessionStorage.removeItem('user');
    }

    useEffect(() => {
        checkUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                auth,
                login,
                isLoadingUser,
                resetUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;

export {
    AuthProvider
}