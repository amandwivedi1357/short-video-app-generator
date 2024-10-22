"use client"

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React, { useContext, useState, useEffect } from 'react'
import {Button} from "@/components/ui/button"
import DarkModeToggle from '@/components/ui/DarkModeToggle'
import {UserDetailContext} from "../../_context/UserDetailContext"

const Header = () => {
  const {userDetails} = useContext(UserDetailContext)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null // or a simple placeholder

  return (
    <div className='p-3 px-5 flex items-center justify-between shadow-md'>
        <div className='flex gap-3 items-center'>
            <Image
            src={'/logo.png'}
            alt='logo'
            width={50}
            height={50}
            className='rounded-full'
            />
            <h2 className='font-bold text-xl'>ClipVerse</h2>
        </div>
        <div className='flex gap-3 items-center'>
          <h2>Credits: {userDetails?.credits || 0}</h2>
            <Button className='bg-purple-500 dark:text-white font-semibold dark:hover:text-black'>
                Dashboard
            </Button>
            <DarkModeToggle/>
            <UserButton/>
        </div>
    </div>
  )
}

export default Header
