'use client'

import { ProfileResp } from '@/types/response'
import { fetchWrapper } from '@/utils/fetch'
import clsx from 'clsx'
import { useFollow } from '@/components/common/FollowProvider'
import { useState } from 'react'
import { useAuth } from '@/components/common/AuthProvider'
import { usePathname, useRouter } from '@/navigation'
import { useTranslations } from 'next-intl'

interface FollowButtonProps {
  author: string
  className?: string
}

const FollowButton = ({ author, className }: FollowButtonProps) => {
  const [loading, setLoading] = useState(false)
  const { following, setFollowing } = useFollow()

  const { currentUser } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const handleFavorites = async () => {
    if (!currentUser) {
      router.push(`/login?callback=${pathname}`)
    }

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

  const t = useTranslations('Profile')
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
      &nbsp; {following ? t('unfollow') : t('follow')}&nbsp;
      {author}
    </button>
  )
}
export default FollowButton
