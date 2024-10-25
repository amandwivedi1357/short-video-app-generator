import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Textarea } from "@/components/ui/textarea"
const SelectDuration = ({onUserSelect}) => {
    const [selectedOption, setSelectedOption] = useState();
  return (
    <div className='mt-7'>
        <h2 className='font-bold text-xl text-purple-600 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 '>
            Duration
        </h2>
        <p className='text-gray-500'>What is the topic of your video</p>


        <Select onValueChange={(value)=>{
            
            setSelectedOption(value)
            value!='Custom Prompt' && onUserSelect('duration',value)
            }}>
  <SelectTrigger className="className='w-full mt-2 p-6 text-lg'">
    <SelectValue placeholder="Select Duration of the video" />
  </SelectTrigger>
  <SelectContent>
  
            
            <SelectItem   value='15 Seconds'>15 Seconds</SelectItem>
            <SelectItem   value='30 Seconds'>30 Seconds</SelectItem>
            <SelectItem   value='60 Seconds'>60 Seconds</SelectItem>
     
   
  </SelectContent>
</Select>
{selectedOption === 'Custom Prompt'&& (
    <div className='mt-2'>

    <Textarea placeholder='Enter prompt here...'
    onChange = {(e)=>onUserSelect('topic',e.target.value)}
    />
    </div>
)}
    
    </div>
  )
}

export default SelectDuration
