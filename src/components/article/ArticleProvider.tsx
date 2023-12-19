'use client'

import React, { createContext, useContext } from 'react'
import { ArticleItem } from '@/types/response'

export type ArticleContextType = {
  article: ArticleItem | null
}
export const ArticleContext = createContext<ArticleContextType>({
  article: null,
})

interface ArticleProviderProps {
  article: ArticleItem | null
  children: React.ReactNode
}

export const ArticleProvider = ({
  article,
  children,
}: ArticleProviderProps) => {
  return (
    <ArticleContext.Provider value={{ article }}>
      {children}
    </ArticleContext.Provider>
  )
}

export const useArticle = () => {
  return useContext(ArticleContext)
}
