import { createContext, useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const retrieveUserStoredToken = async () => {
  const storedToken = await AsyncStorage.getItem("token");
  return {
    token: storedToken,
  };
};

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      const userData = await retrieveUserStoredToken();
      setToken(userData.token ?? "");
    };
    fetchToken();
  }, []);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(async () => {
    setToken("");
    await AsyncStorage.removeItem("token");
  }, []);

  const loginHandler = async (newToken) => {
    setToken(newToken);
    await AsyncStorage.setItem("token", newToken);
  };

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
