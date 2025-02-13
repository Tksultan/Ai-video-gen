import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function Emptystate() {
  return (
    <div className='p-5 py-24 flex items-center flex-col mt-10 border-2 border-dotted border-gray-300 gap-3'>
      <h2>You don't have any video created</h2>
      <Link href={'/dashboard/create-new'}>
      <Button>Create New Video</Button>
      </Link>
    </div>
  )
}

export default Emptystate