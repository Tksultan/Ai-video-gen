import React from 'react'
import SelectTopic from './_components/SelectTopic.jsx'

function CreateNewVideo() {
  return (
    <div className='md:px-20'>
      <h2 className='font-bold text-2xl text-primary text-center'>Create New Video</h2>

      <div className='mt-10 shadow-md p-10'>
        <SelectTopic/>
      </div>
    </div>
  )
}

export default CreateNewVideo