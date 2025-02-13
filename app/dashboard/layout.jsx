import React from 'react'
import Header from './_component/Header'
import Sidenavbar from './_component/Sidenavbar'

function DashboardLayout({children}) {
  return (
    <div>
      <div className='hidden md:block  h-screen bg-white fixed mt-[70px] w-[20%]'>
        <Sidenavbar/>
      </div>
      <div>
        <Header/>
        <div className='md:ml-[20%] p-10'>
         {children}
        </div>
      </div>
      
    </div>
  )
}

export default DashboardLayout