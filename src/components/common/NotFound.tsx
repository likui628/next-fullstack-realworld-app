import React from 'react'
import { useTranslations } from 'next-intl'
import BackHome from '@/components/common/BackHome'

const NotFound = () => {
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

export default NotFound
