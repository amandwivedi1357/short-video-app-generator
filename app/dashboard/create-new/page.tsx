'use client'
import React, { useState } from 'react'
import SelectTopic from "./_components/SelectTopic"
import SelectStyle from "./_components/SelectStyle"
const page = () => {
  const [formData, setformData] = useState();
  const onHandleInputChange = (fieldName,fieldValue)=>{
    console.log(fieldName,fieldValue)
  }
  return (
    <div className='md:px-20'>
      <h2 className='font-bold text-4xl text-purple-500 text-center'>
    Create New
      </h2>
      <div className='mt-10 shadow-md dark:shadow-purple-500 dark:shadow-md rounded-md p-10'>
        <SelectTopic onUserSelect={onHandleInputChange}/>
        {/* Select tipic component */}
        <SelectStyle/>
        {/* Select Style component */}
        {/* Create button */}
      </div>
    
    </div>
  )
}

export default page