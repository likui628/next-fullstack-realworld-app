'use client'

import React from 'react'

interface BackHomeProps {
  className?: string
  children?: React.ReactNode
}

const BackHome = ({ className, children }: BackHomeProps) => {
  const handleBackHome = () => {
    // fix when use <Link href="/">, it will throw error:
    // Expected a suspended thenable. This is a bug in React. Please file an issue.
    window.location.href = '/'
  }
  return (
    <button className={className} onClick={handleBackHome}>
      {children}
    </button>
  )
}
export default BackHome
