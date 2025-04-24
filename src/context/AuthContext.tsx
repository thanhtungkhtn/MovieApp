import React, { createContext, useContext, useEffect, useState } from "react";
import { getAccountDetail } from "@/services/user.services";
import AsyncStorage from "@react-native-async-storage/async-storage";
type User = {
  id: number;
  username: string;
  name: string;
};
export type AuthContextType = {
  sessionId: string;
  user: User | undefined
  login: (sessionId: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [sessionId, setSessionId] = useState<string>("");
  const [user, setUser] = useState<AuthContextType["user"]>(null);

  const getAccountDetail = async (sessionId: string) => {
    setloading(true)

    await AsyncStorage.setItem("sessionId", sessionId);
    const account = await getAccountDetail(sessionId);
    AsyncStorage.setItem
    // setUser({
    //   id: account.id,
    //   username: account.username,
    //   name: account.name,
    // });
    await AsyncStorage.setItem("user", JSON.stringify(account));
  };

  const logout = async () => {
    setSessionId("");
    setUser(null);
    await AsyncStorage.clear();
  };

  useEffect(() => {
    const loadSession = async () => {
      token
      getAccountDetail => resdux
      catch => expired token
    };
    loadSession();
  }, []);

  return (
    <AuthContext.Provider value={{ sessionId, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
