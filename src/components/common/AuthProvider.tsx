"use client";

import { createContext, useContext } from "react";
import { ChildrenProps } from "@/types/props";
import { CurrentUser } from "@/types/server";

interface AuthContext {
  currentUser: CurrentUser | null;
}

const initialAuthContext: AuthContext = {
  currentUser: null,
};

export const AuthContext = createContext<AuthContext>(initialAuthContext);

interface AuthProviderProps extends ChildrenProps {
  currentUser: CurrentUser | null;
}

export const AuthProvider = ({ currentUser, children }: AuthProviderProps) => {
  return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
