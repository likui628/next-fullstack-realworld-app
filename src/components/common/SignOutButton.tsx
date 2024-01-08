'use client'

import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'

const SignOutButton = () => {
  const handleClick = async () => {
    await signOut({ callbackUrl: '/' })
  }

  const t = useTranslations('Settings')
  return (
    <button className="btn btn-outline-danger" onClick={handleClick}>
      {t('sign-out')}
    </button>
  )
}

export default SignOutButton
