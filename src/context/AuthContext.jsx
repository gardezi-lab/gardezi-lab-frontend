import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("LoggedInUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsLoggedIn(true);
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem("token", userData?.token);
        localStorage.setItem("LoggedInUser", JSON.stringify(userData?.user));
        localStorage.setItem("permissions", JSON.stringify(userData?.permissions));
        setUser(userData);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("LoggedInUser");
        setUser(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoggedIn,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);
