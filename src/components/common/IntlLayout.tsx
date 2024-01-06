import React from 'react'
import { NextIntlClientProvider, useMessages } from 'next-intl'

interface IntlLayoutProps {
  params: { locale: string }
  children: React.ReactNode
}

const IntlLayout = ({ params: { locale }, children }: IntlLayoutProps) => {
  const messages = useMessages()
  return (
    <>
      <html lang={locale}>
        <body suppressHydrationWarning={true}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
    </>
  )
}

export default IntlLayout
