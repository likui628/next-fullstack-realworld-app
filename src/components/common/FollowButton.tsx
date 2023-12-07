'use client'

import { ArticleItem } from '@/types/server'
import { fetchWrapper } from '@/utils/fetch'
import { useState } from 'react'

interface FollowButtonProps {
  article: ArticleItem
  className?: string
  onChange?: (favorite: ArticleItem) => void
}

const FollowButton = ({ article, className, onChange }: FollowButtonProps) => {
  const author = article.author
  const following = article.author.following
  const [loading, setLoading] = useState(false)

  const handleFavorites = async () => {
    setLoading(true)
    try {
      const username = author.username
      const data = following
        ? await fetchWrapper<ArticleItem>(
            `/profiles/${username}/follow`,
            'DELETE',
          )
        : await fetchWrapper<ArticleItem>(
            `/profiles/${username}/follow`,
            'POST',
          )

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
      className={`${className || ''} btn btn-sm ${
        author.following ? 'btn-secondary' : 'btn-outline-secondary'
      }`}
    >
      <i className="ion-plus-round"></i>
      &nbsp; {article.author.following ? 'Unfollow' : 'Follow'}&nbsp;
      {article.author.username}
    </button>
  )
}
export default FollowButton
