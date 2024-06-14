"use client";
import { signOut } from 'next-auth/react'
import React from 'react'

const LogoutButton = () => {
  return (
    <button className='border px-4 py-2 shadow' onClick={() => signOut()} >
      Log Out
    </button>
  )
}

export default LogoutButton
