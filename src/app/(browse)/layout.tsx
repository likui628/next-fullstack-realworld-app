import { Metadata } from 'next'
import React from 'react'

import '@/app/global.css'

import getCurrentUser from '@/actions/getCurrentUser'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import { AuthProvider } from '@/components/common/AuthProvider'
import IntlLayout from '@/components/common/IntlLayout'

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

async function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  const currentUser = await getCurrentUser()
  return (
    <IntlLayout params={{ locale }}>
      <AuthProvider currentUser={currentUser}>
        <Header currentUser={currentUser} />
        {children}
        <Footer />
      </AuthProvider>
    </IntlLayout>
  )
}

export default RootLayout
