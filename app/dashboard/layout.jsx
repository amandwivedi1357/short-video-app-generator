"use client"

import React, { useState } from 'react'
import {VideoDataContext} from "../_context/VideoDataContext" 
import Header from "./_components/Header"
import Sidenav from "./_components/Sidenav"
const DashboardLayout = ({children}) => {
  const [videoData, setVideoData] = useState([]);
  return (
    <VideoDataContext.Provider value = {{videoData,setVideoData}}>

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
  )
}

export default DashboardLayout