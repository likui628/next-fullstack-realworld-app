import React from 'react'
import { NextIntlClientProvider, useMessages } from 'next-intl'

interface ProvidersProps {
  children: React.ReactNode
  locale: string
}

const IntlProvider = ({ children, locale }: ProvidersProps) => {
  const messages = useMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}

export default IntlProvider
