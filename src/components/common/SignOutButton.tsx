'use client'

import { signOut } from 'next-auth/react'

const SignOutButton = () => {
  const handleClick = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <button className="btn btn-outline-danger" onClick={handleClick}>
      Or click here to logout.
    </button>
  )
}

export default SignOutButton
