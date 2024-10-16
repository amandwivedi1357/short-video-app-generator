import Image from 'next/image'
import React from 'react'

const SelectStyle = () => {
    const styleOptions = [
        {
            name:'realistic',
            img:'/real.jpg'
        },
        {
            name:'Cartoon',
            img:'/cartoon.jpeg'
        },
        {
            name:'Comic',
            img:'/comic.jpg'
        },
        {
            name:'watercolor',
            img:'/Watercolor.jpeg'
        },
        {
            name:'GTA',
            img:'/gta.jpeg'
        },
    ]
  return (
    <div className='mt-7 '>
        <h2 className='font-bold text-2xl text-purple-500'>Style</h2>
        <p className='text-gray-500'>Select your Style</p>
        <div className='w-full mt-3 grid grid-cols-2 md:grid-cols-1 lg:grid-cols-5 xl:grid-cols-6 gap-5'>
            {styleOptions.map((item,idx)=>(
                <div className='relative hover:scale-105 transition-all cursor-pointer dark:shadow-purple dark:shadow-sm' key={idx}>
                    <Image src={item.img} width={130} height={130} 
                    className='h-56 object-cover rounded-lg w-full'
                    />
                    <h2 className='absolute p-1 text-white font-semibold text-center rounded-b-lg bg-black bottom-0 w-full'>{item.name}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SelectStyle