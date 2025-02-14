"use client"

import React, { useState } from 'react'
import Header from './_component/Header'
import Sidenavbar from './_component/Sidenavbar'
import { VideoDataContext } from '@/app/_context/videoDataContext.jsx';


function DashboardLayout({children}) {
  const [videoData, setVideoData]= useState();
  return (
    <VideoDataContext.Provider value={{videoData, setVideoData}}>
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
    </VideoDataContext.Provider>
  )
}

export default DashboardLayout