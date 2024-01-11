'use client'

import React, { useTransition } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { locales, usePathname, useRouter } from '@/navigation'

const LocaleSelector = () => {
  const router = useRouter()
  const locale = useLocale()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()

  const t = useTranslations('LocaleSelector')

  const handleLocaleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    startTransition(() => {
      router.push(pathname, { locale: value })
    })
  }

  return (
    <select
      style={{
        display: 'block',
        paddingTop: '0.425rem',
        paddingBottom: '0.425rem',
        border: '1px solid #ced4da',
        color: '#0000004d',
      }}
      value={locale}
      onChange={handleLocaleChange}
      disabled={isPending}
    >
      {locales.map((l) => (
        <option value={l} key={l}>
          {t(l as any)}
        </option>
      ))}
    </select>
  )
}
export default LocaleSelector
