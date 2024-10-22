"use client"

import React, { useEffect, useState } from 'react'
import {VideoDataContext} from "../_context/VideoDataContext" 
import Header from "./_components/Header"
import Sidenav from "./_components/Sidenav"
import { useUser } from '@clerk/nextjs'
import { db } from '@/config/db'
import { Users } from '@/config/schema'
import {UserDetailContext} from "../_context/UserDetailContext"
import { eq } from 'drizzle-orm'

const DashboardLayout = ({children}) => {
  const [videoData, setVideoData] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const {user, isLoaded} = useUser()
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    setIsClientSide(true);
    if (isLoaded && user) {
      getUserDetail()
    }
  }, [isLoaded, user]);

  const getUserDetail = async () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      const result = await db.select().from(Users).where(eq(Users.email, user.primaryEmailAddress.emailAddress))
      if (result.length > 0) {
        setUserDetails(result[0])
      }
    }
  }

  if (!isClientSide) {
    return null; // Return null on server-side
  }

  if (!isLoaded) {
    return <div>Loading...</div>; // Or some loading spinner
  }

  return (
    <UserDetailContext.Provider value={{userDetails,setUserDetails}}>
      <VideoDataContext.Provider value={{videoData,setVideoData}}>
        <div>
          <div className='hidden md:block h-screen bg-white dark:bg-black fixed mt-[72px] w-64'>
            <Sidenav/>
          </div>
          <div>
            <Header/>
            <div className='md:ml-64 p-10'>
              {children}
            </div>
          </div>
        </div>
      </VideoDataContext.Provider>
    </UserDetailContext.Provider>
  )
}

export default DashboardLayout
