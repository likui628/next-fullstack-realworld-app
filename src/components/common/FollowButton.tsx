'use client'

import { ProfileResp } from '@/types/response'
import { fetchWrapper } from '@/utils/fetch'
import clsx from 'clsx'
import { useFollow } from '@/components/common/FollowProvider'
import { useState } from 'react'

interface FollowButtonProps {
  author: string
  className?: string
}

const FollowButton = ({ author, className }: FollowButtonProps) => {
  const [loading, setLoading] = useState(false)
  const { following, setFollowing } = useFollow()

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
        setFollowing(data.profile.following)
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
