"use client"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import EmptyState from "./_components/EmptyState"
import Link from 'next/link'
const page = () => {
  const [videoList, setvideoList] = useState([]);
  return (
    <div className=''>
      <div className='flex items-center justify-between'>
        <h2 className='font-bold text-2xl text-purple-500'>Dashboard</h2>
        <Link href={'/dashboard/create-new'} >
      <Button className='bg-purple-500'>
Create New Short Video
      </Button>
      </Link>
      </div>
      {/* empty state */}
      {
        videoList?.length===0 && (
          <div className=''>
            <EmptyState/>
      </div>
        )
      }
      
    </div>
  )
}

export default page