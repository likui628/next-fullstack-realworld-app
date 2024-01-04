'use client'

import { ArticleItem } from '@/types/response'
import { fetchWrapper } from '@/utils/fetch'
import { useState } from 'react'
import clsx from 'clsx'
import { useArticle } from '@/components/article/ArticleProvider'
import { useAuth } from '@/components/common/AuthProvider'
import { usePathname, useRouter } from 'next/navigation'

interface FavoriteButtonProps {
  className?: string
  text?: string
}

const FavoriteButton = ({ className, text }: FavoriteButtonProps) => {
  const { article, setArticle } = useArticle()
  const { favorited, favoritesCount, slug } = { ...article }
  const [loading, setLoading] = useState(false)

  const { currentUser } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const handleFavorites = async () => {
    if (!currentUser) {
      router.push(`/login?callback=${pathname}`)
    }

    setLoading(true)
    try {
      const data = favorited
        ? await fetchWrapper<ArticleItem>(
            `/articles/${slug}/favorite`,
            'DELETE',
          )
        : await fetchWrapper<ArticleItem>(`/articles/${slug}/favorite`, 'POST')

      if (data) {
        setArticle(data)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleFavorites}
      disabled={loading}
      className={clsx(
        className || 'btn btn-sm',
        favorited ? 'btn-primary' : 'btn-outline-primary',
      )}
    >
      <i className="ion-heart"></i>
      {text ? (
        <>
          &nbsp; {text} <span className="counter">({favoritesCount})</span>
        </>
      ) : (
        <>&nbsp; {favoritesCount}</>
      )}
    </button>
  )
}
export default FavoriteButton
