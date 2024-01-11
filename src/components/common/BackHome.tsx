'use client'

import React from 'react'
import { useRouter } from '@/navigation'

interface BackHomeProps {
  className?: string
  children?: React.ReactNode
}

const BackHome = ({ className, children }: BackHomeProps) => {
  const router = useRouter()
  const handleBackHome = () => {
    router.push('/')
  }
  return (
    <button className={className} onClick={handleBackHome}>
      {children}
    </button>
  )
}
export default BackHome
