'use client'

import { ArticleItem } from '@/types/response'
import { fetchWrapper } from '@/utils/fetch'
import { useState } from 'react'

interface FollowButtonProps {
  author: string
  following?: boolean
  className?: string
  onChange?: (favorite: ArticleItem) => void
}

const FollowButton = ({
  author,
  following,
  className,
  onChange,
}: FollowButtonProps) => {
  const [loading, setLoading] = useState(false)

  const handleFavorites = async () => {
    setLoading(true)
    try {
      const data = following
        ? await fetchWrapper<ArticleItem>(
            `/profiles/${author}/follow`,
            'DELETE',
          )
        : await fetchWrapper<ArticleItem>(`/profiles/${author}/follow`, 'POST')

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
        following ? 'btn-secondary' : 'btn-outline-secondary'
      }`}
    >
      <i className="ion-plus-round"></i>
      &nbsp; {following ? 'Unfollow' : 'Follow'}&nbsp;
      {author}
    </button>
  )
}
export default FollowButton
