import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import './global.css'
import getCurrentUser from '@/actions/getCurrentUser'
import { AuthProvider } from '@/components/common/AuthProvider'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: {
    template: '%s | next.js RealWorld example app',
    default: 'Conduit | next.js RealWorld example app', // a default is required when creating a template
  },
  description: 'Powered by Next.js',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body>
        <AuthProvider currentUser={currentUser}>
          <Header currentUser={currentUser} />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
