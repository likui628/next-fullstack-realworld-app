'use client'

import React, { createContext, useContext, useState } from 'react'
import { ArticleItem } from '@/types/response'

export type ArticleContextType = {
  article: ArticleItem | null
  setArticle: (article: ArticleItem) => void
}
export const ArticleContext = createContext<ArticleContextType>({
  article: null,
  setArticle: () => {},
})

interface ArticleProviderProps {
  article: ArticleItem | null
  children: React.ReactNode
}

export const ArticleProvider = ({
  article: originalArticle,
  children,
}: ArticleProviderProps) => {
  const [article, setArticle] = useState<ArticleItem | null>(originalArticle)
  return (
    <ArticleContext.Provider value={{ article, setArticle }}>
      {children}
    </ArticleContext.Provider>
  )
}

export const useArticle = () => {
  return useContext(ArticleContext)
}
