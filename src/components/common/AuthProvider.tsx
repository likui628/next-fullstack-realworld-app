'use client'

import React, { createContext, useContext } from 'react'
import { CurrentUser } from '@/types/response'

interface AuthContext {
  currentUser: CurrentUser | null
}

const initialAuthContext: AuthContext = {
  currentUser: null,
}

export const AuthContext = createContext<AuthContext>(initialAuthContext)

interface AuthProviderProps {
  currentUser: CurrentUser | null
  children: React.ReactNode
}

export const AuthProvider = ({ currentUser, children }: AuthProviderProps) => {
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
