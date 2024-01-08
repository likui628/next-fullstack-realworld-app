import React from 'react'

import getCurrentUser from '@/actions/getCurrentUser'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import { AuthProvider } from '@/components/common/AuthProvider'

interface RootLayoutProps {
  children: React.ReactNode
}

async function RootLayout({ children }: RootLayoutProps) {
  const currentUser = await getCurrentUser()
  return (
    <AuthProvider currentUser={currentUser}>
      <Header currentUser={currentUser} />
      {children}
      <Footer />
    </AuthProvider>
  )
}

export default RootLayout
