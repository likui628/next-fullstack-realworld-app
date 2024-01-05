import { Metadata } from 'next'
import React from 'react'
import IntlLayout from '@/components/layouts/IntlLayout'
import AuthLayout from '@/components/layouts/AuthLayout'

import '@/app/global.css'

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
  return (
    <IntlLayout params={{ locale }}>
      <AuthLayout>{children}</AuthLayout>
    </IntlLayout>
  )
}

export default RootLayout
