import React from 'react';
import { useState, useCallback } from 'react';

interface AuthContextType {
    token: string;
    isLoggedIn: boolean;
    name: string;
    login: (token: string, name: string) => void;
    logout: () => void;
}

export const AuthContext = React.createContext<AuthContextType>({
    token: '',
    isLoggedIn: false,
    name: '',
    login: () => {},
    logout: () => {},
});

const retrieveUserStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedName = localStorage.getItem('name');
    return {
        token: storedToken,
        name: storedName,
    };
};
export function AuthContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const userData = retrieveUserStoredToken();
    const initialToken = userData.token ?? '';
    const initialName = userData.name ?? '';

    const [token, setToken] = useState(initialToken);
    const [name, setName] = useState(initialName);
    const userIsLoggedIn = !!token;
    const logoutHandler = useCallback(() => {
        setToken('');
        setName('');
        localStorage.removeItem('token');
        localStorage.removeItem('name');
    }, []);
    function loginHandler(token: string, name: string) {
        setToken(token);
        setName(name);
        localStorage.setItem('token', token);
        localStorage.setItem('name', name);
    }

    const contextValue = {
        token: token,
        name: name,
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
