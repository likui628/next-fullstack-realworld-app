import { useTranslations } from 'next-intl'
import React from 'react'
import BackHome from '@/components/common/BackHome'

export const dynamic = 'force-dynamic'

export default function NotFound() {
  const t = useTranslations('Misc')

  return (
    <div className="not-found-container">
      <div>
        <h2>{t('404')}</h2>
        <p>{t('404-desc')}</p>

        <BackHome className="back-home-btn">{t('return-home')}</BackHome>
      </div>
    </div>
  )
}
