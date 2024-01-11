import React from 'react'
import getCurrentUser from '@/actions/getCurrentUser'
import { AuthProvider } from '@/components/common/AuthProvider'

interface ProvidersProps {
  children: React.ReactNode
}

const UserProvider = async ({ children }: ProvidersProps) => {
  const currentUser = await getCurrentUser()

  return <AuthProvider currentUser={currentUser}>{children}</AuthProvider>
}

export default UserProvider
