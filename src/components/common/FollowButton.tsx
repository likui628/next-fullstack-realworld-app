'use client'

import { Profile, ProfileResp } from '@/types/response'
import { fetchWrapper } from '@/utils/fetch'
import { useState } from 'react'
import clsx from 'clsx'

interface FollowButtonProps {
  author: string
  following?: boolean
  className?: string
  onChange?: (profile: Profile) => void
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
        ? await fetchWrapper<ProfileResp>(
            `/profiles/${author}/follow`,
            'DELETE',
          )
        : await fetchWrapper<ProfileResp>(`/profiles/${author}/follow`, 'POST')

      if (data) {
        onChange && onChange(data.profile)
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
        className || '',
        'btn btn-sm',
        following ? 'btn-secondary' : 'btn-outline-secondary',
      )}
    >
      <i className="ion-plus-round"></i>
      &nbsp; {following ? 'Unfollow' : 'Follow'}&nbsp;
      {author}
    </button>
  )
}
export default FollowButton
