"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import EmptyState from "./_components/EmptyState"
import Link from 'next/link'
import { db } from '@/config/db'
import { eq } from 'drizzle-orm'
import { VideoData } from '@/config/schema'
import VideoList from "./_components/VideoList"
import { useUser } from '@clerk/nextjs'
import { PlusCircle } from 'lucide-react'

const Page = () => {
  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoaded } = useUser()

  useEffect(() => {
    if (isLoaded && user) {
      getVideoList();
    }
  }, [isLoaded, user]);

  const getVideoList = async () => {
    try {
      setLoading(true);
      const result = await db.select().from(VideoData).where(eq(VideoData.createdBy, user.primaryEmailAddress.emailAddress))
      console.log(result);
      setVideoList(result);
    } catch (error) {
      console.error("Error fetching video list:", error);
    } finally {
      setLoading(false);
    }
  }

  if (!isLoaded || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=''>
      <div className='flex items-center justify-between'>
        <h2 className='font-bold text-2xl text-purple-500'>Dashboard</h2>
        <Link href={'/dashboard/create-new'}>
          <Button className='flex gap-2 bg-purple-500'>
            Create New <PlusCircle />  
          </Button>
        </Link>
      </div>
      {videoList.length === 0 ? (
        <div className=''>
          <EmptyState />
        </div>
      ) : (
        <VideoList videoList={videoList} />
      )}
    </div>
  )
}

export default Page
