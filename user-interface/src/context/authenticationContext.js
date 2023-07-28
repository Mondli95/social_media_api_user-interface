import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    const [loggedUser, setLoggedUser] = useState(
        JSON.parse(localStorage.getItem('loggedUser')) || false
    );

    const login = async (inputs) => {
        const response = await axios.post('http://localhost:8800/api/auth/login', inputs, {
            withCredentials: true
        });

        setLoggedUser(response.data)
    };

    useEffect(() => {
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    }, [loggedUser]);

    return (
        <AuthenticationContext.Provider value={{ loggedUser, login }}>
            {children}
        </AuthenticationContext.Provider>
    );
};