"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import EmptyState from "./_components/EmptyState"
import Link from 'next/link'
import { db } from '@/config/db'
import { eq, inArray } from 'drizzle-orm'
import { VideoData } from '@/config/schema'
import VideoList from "./_components/VideoList"
import { useUser } from '@clerk/nextjs'
import { ArrowRight, PlusCircle } from 'lucide-react'
import { motion } from 'framer-motion'

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

  const handleDeleteVideos = async (videoIds) => {
    try {
      await db.delete(VideoData).where(inArray(VideoData.id, videoIds));
      // Refresh the video list after deletion
      getVideoList();
    } catch (error) {
      console.error("Error deleting videos:", error);
    }
  }

  if (!isLoaded || loading) {
    return <div>Loading...</div>;
  }
  

  return (
    <div className=''>
      <div className='flex items-center justify-between'>
        <h2 className='font-bold text-2xl text-purple-500'>Dashboard</h2>
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link
          href="/dashboard/create-new"
          className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Create New
          <ArrowRight className="ml-2" />
        </Link>
      </motion.div>
      </div>
      {videoList.length === 0 ? (
        <div className=''>
          <EmptyState />
        </div>
      ) : (
        <VideoList videoList={videoList} onDeleteVideos={handleDeleteVideos} />
      )}
    </div>
  )
}

export default Page
