"use client"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import Emptystate from './_component/Emptystate';
import Link from 'next/link';

function Dashboard() {
  const [videoList, setVideoList] = useState([]);

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-2xl text-primary'>Dashboard</h2>
        <Link href={'/dashboard/create-new'}>
          <Button>+ Create new</Button>
        </Link>
      </div>

      {/*empaty state*/}
      {videoList?.length==0&&
      <div>
          <Emptystate/>
      </div>
      }
      
    </div>
  )
}

export default Dashboard