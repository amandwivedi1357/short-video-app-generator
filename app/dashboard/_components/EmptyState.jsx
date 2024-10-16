import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const EmptyState = () => {
  return (
    <div className='p-5 flex items-center flex-col mt-10 border-2 border-dashed'>
      
      <h2>You don't have any video created yet</h2>
      <Link href={'/dashboard/create-new'} >
      <Button className='bg-purple-500'>
Create New Short Video
      </Button>
      </Link>
    </div>
  )
}

export default EmptyState