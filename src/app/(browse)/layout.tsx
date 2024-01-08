import { Metadata } from 'next'
import React from 'react'

import '@/app/global.css'
import { NextIntlClientProvider, useMessages } from 'next-intl'

export const metadata: Metadata = {
  title: {
    template: '%s | next.js RealWorld example app',
    default: 'Conduit | next.js RealWorld example app', // a default is required when creating a template
  },
  description: 'Powered by Next.js',
}

interface RootLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

async function IntlLayout({ children, params: { locale } }: RootLayoutProps) {
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
