import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import {UserButton} from '@clerk/nextjs'

function Header() {
  return (
    <div className='fixed w-full bg-[#12013e] p-3 px-5 flex h-[70px] items-center justify-between shadow-lg z-50'>
      <div className='flex items-center '>
        <Image src={'/logo.png'} width={140} height={50} alt='logo'/>
      </div>
      <div className='flex gap-5 items-center'>
        <Button>Dashboard</Button>
        <UserButton/>
      </div>
    </div>
  )
}

export default Header