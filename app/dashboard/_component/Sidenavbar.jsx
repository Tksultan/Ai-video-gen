"use client"
import { CircleUserIcon, FileVideo, PanelsTopLeft, ShieldPlus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function Sidenavbar() {
  const MenuOptions=[
    {
      id:1,
      name: 'Dashboard',
      path:'/dashboard',
      icon: PanelsTopLeft
    },
    {
      id:2,
      name: 'Create New',
      path:'/dashboard/create-new',
      icon: FileVideo
    },
    {
      id:3,
      name: 'Upgrade',
      path:'/upgrade',
      icon: ShieldPlus
    },
    {
      id:4,
      name: 'Account',
      path:'/account',
      icon: CircleUserIcon
    }
  ]

  const path= usePathname();

  return (
    <div className='h-screen shadow-lg p-5'>
      <div className='grid'>
        {MenuOptions.map((items, index)=>(
          <Link href={items.path} key={items.id}>
          <div className={`flex items-center gap-2 rounded-3xl px-7 py-3 my-[2px] hover:bg-[#12013e] hover:text-white cursor-pointer ${path==items.path&&'bg-[#12013e] text-white'}`}>
          <items.icon />
          <h2>{items.name}</h2>
          </div>
          </Link>
        )
        )}
      </div>
      
    </div>
  )
}

export default Sidenavbar