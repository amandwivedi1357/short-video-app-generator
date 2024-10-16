import React from 'react'
import Header from "./_components/Header"
import Sidenav from "./_components/Sidenav"
const DashboardLayout = ({children}) => {
  return (
    <div>
       <div className='hidden md:block h-screen bg-white dark:bg-black fixed mt-[72px] w-64'>
    <Sidenav/>
</div>
        <div>
            <Header/>
            <div className='md:ml-64 p-10'>

            {children}
            </div>
        </div>
    </div>
  )
}

export default DashboardLayout