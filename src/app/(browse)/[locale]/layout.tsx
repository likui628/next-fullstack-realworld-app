import React from 'react'
import { Metadata } from 'next'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import UserProvider from './UserProvider'
import IntlProvider from './IntlProvider'

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

function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  return (
    <>
      <html lang={locale}>
        <body suppressHydrationWarning={true}>
          <IntlProvider locale={locale}>
            <UserProvider>
              <Header />
              {children}
              <Footer />
            </UserProvider>
          </IntlProvider>
        </body>
      </html>
    </>
  )
}

export default RootLayout
