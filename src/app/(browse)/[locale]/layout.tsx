import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import '../../global.css'
import getCurrentUser from '@/actions/getCurrentUser'
import { AuthProvider } from '@/components/common/AuthProvider'
import { Metadata } from 'next'
import React from 'react'
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
  messages: Record<string, string>
}

async function RootLayout({
  children,
  params: { locale },
  messages,
}: RootLayoutProps) {
  const currentUser = await getCurrentUser()
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider currentUser={currentUser}>
            <Header currentUser={currentUser} />
            {children}
            <Footer />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

RootLayout.getInitialProps = async () => {
  const messages = useMessages()
  return { messages }
}

export default RootLayout
