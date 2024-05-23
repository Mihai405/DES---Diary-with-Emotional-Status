import React from 'react';
import { useState, useCallback } from 'react';

interface AuthContextType {
    token: string;
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = React.createContext<AuthContextType>({
    token: '',
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
});

const retrieveUserStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    return {
        token: storedToken,
    };
};
export function AuthContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const userData = retrieveUserStoredToken();
    const initialToken = userData.token ?? '';

    const [token, setToken] = useState(initialToken);
    const userIsLoggedIn = !!token;
    const logoutHandler = useCallback(() => {
        setToken('');
        localStorage.removeItem('token');
    }, []);
    function loginHandler(token: string) {
        setToken(token);
        localStorage.setItem('token', token);
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}
