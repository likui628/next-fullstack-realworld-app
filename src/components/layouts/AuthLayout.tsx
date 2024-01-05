import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'

import getCurrentUser from '@/actions/getCurrentUser'
import { AuthProvider } from '@/components/common/AuthProvider'
import React from 'react'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  const currentUser = await getCurrentUser()

  return (
    <AuthProvider currentUser={currentUser}>
      <Header currentUser={currentUser} />
      {children}
      <Footer />
    </AuthProvider>
  )
}

export default AuthLayout
