"use client"
import { CircleUser, FileVideo, PanelsTopLeft, ShieldPlus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidenav = () => {
    const MenuOptions = [
        {
            id:1,
            name:'Dashboard',
            path:'/dashboard',
            icon:PanelsTopLeft
        },
        {
            id:2,
            name:'Create New',
            path:'/dashboard/create-new',
            icon:FileVideo
        },
        {
            id:3,
            name:'Upgrade',
            path:'/upgrade',
            icon:ShieldPlus
        },
        {
            id:4,
            name:'Account',
            path:'/account',
            icon:CircleUser
        },
    ]
    const path = usePathname();

  return (
    <div className='w-64 h-screen shadow-md p-5'>
       <div className='grid gap-3'>
        {MenuOptions.map((item,idx)=>(
            <Link href={item.path}>
            <div key={idx} className={`flex rounded-md cursor-pointer items-center p-3 gap-3 hover:bg-purple-500 hover:text-white ${path==item.path && 'bg-purple-500 text-white'}`}>
                <item.icon/>
                <h2>{item.name}</h2>
            </div>
            </Link>
        ))}
       </div>
    </div>
  )
}

export default Sidenav