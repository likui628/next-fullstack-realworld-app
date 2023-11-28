"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ChildrenProps } from "@/types/props";

interface AuthContext {
  isAuthenticated: boolean;
  login: (jwtToken: string) => void;
  logout: () => void;
}

const initialAuthContext: AuthContext = {
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContext>(initialAuthContext);

export const AuthProvider = ({ children }: ChildrenProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    setIsAuthenticated(!!jwtToken);
  }, []);

  const login = (jwtToken: string) => {
    localStorage.setItem("jwtToken", jwtToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
