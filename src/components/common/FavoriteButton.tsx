'use client'

import { ArticleItem } from '@/types/response'
import { fetchWrapper } from '@/utils/fetch'
import { useState } from 'react'
import clsx from 'clsx'

interface FavoriteButtonProps {
  article: ArticleItem
  className?: string
  text?: string
  onChange?: (articleItem: ArticleItem) => void
}

const FavoriteButton = ({
  article,
  className,
  text,
  onChange,
}: FavoriteButtonProps) => {
  const { favorited, favoritesCount, slug } = article
  const [loading, setLoading] = useState(false)

  const handleFavorites = async () => {
    setLoading(true)
    try {
      const data = favorited
        ? await fetchWrapper<ArticleItem>(
            `/articles/${slug}/favorite`,
            'DELETE',
          )
        : await fetchWrapper<ArticleItem>(`/articles/${slug}/favorite`, 'POST')

      if (data) {
        onChange && onChange(data)
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
