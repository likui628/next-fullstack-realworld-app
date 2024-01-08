import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'
import React from 'react'

export const dynamic = 'force-dynamic'

export default function NotFound() {
  const t = useTranslations('Misc')

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: '500px',
      }}
    >
      <div>
        <h2>{t('404')}</h2>
        <p>{t('404-desc')}</p>
        <Link href="/">
          <button className="btn btn-lg btn-primary" type="submit">
            {t('return-home')}
          </button>
        </Link>
      </div>
    </div>
  )
}
