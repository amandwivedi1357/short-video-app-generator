"use client"
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Textarea } from "@/components/ui/textarea"

const SelectTopic = ({onUserSelect}) => {
    const options = [
        'Custom Prompt','Random ai Stories','Scary Stories','Bed Time Story','Historical Facts','Motivational Stories'
    ]
    const [selectedOption, setSelectedOption] = useState('');
  return (
    <div>
                <h2 className='font-bold text-xl text-purple-600 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600'>

            Content
        </h2>
        <p className='text-gray-500'>What is the topic of your video</p>


        <Select onValueChange={(value)=>{
            
            setSelectedOption(value)
            value!='Custom Prompt' && onUserSelect('topic',value)
            }}>
  <SelectTrigger className="className='w-full mt-2 p-6 text-lg'">
    <SelectValue placeholder="Content Type" />
  </SelectTrigger>
  <SelectContent>
    {
        options.map((item,idx)=>(
            
            <SelectItem  key={idx} value={item}>{item}</SelectItem>
        ))
    }
   
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

export default SelectTopic
