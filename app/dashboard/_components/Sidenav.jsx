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
        {MenuOptions.map((item, idx) => (
            <Link href={item.path} key={idx}>
                <div className={`flex rounded-md cursor-pointer items-center p-3 gap-3 font-bold transition-all duration-300 ${
                    path === item.path
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105'
                        : 'hover:bg-purple-100 dark:hover:bg-purple-900 text-gray-700 dark:text-gray-300'
                }`}>
                    <item.icon className={`${
                        path === item.path
                            ? 'text-white'
                            : 'text-purple-600 dark:text-pink-400'
                    }`}/>
                    <h2 className={`${
                        path === item.path
                            ? 'text-white'
                            : 'bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600'
                    }`}>{item.name}</h2>
                </div>
            </Link>
        ))}
       </div>
    </div>
  )
}

export default Sidenav