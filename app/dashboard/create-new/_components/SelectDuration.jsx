import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function SelectDuration({onUserSelect}) {
  return (
    <div className='mt-7'>
    <h2 className='font-bold text-xl text-primary'>Duration</h2>
    <p className='text-gray-600'>Select the duration of your video</p>
    <Select onValueChange={(value)=>{ onUserSelect('duration', value)
    }}>
      <SelectTrigger className="w-full mt-2 p-6 text-lg">
        <SelectValue placeholder="Select Duration" />
      </SelectTrigger>
      <SelectContent>
          <SelectItem value={'15 Seconds'}>15 sec</SelectItem>
          <SelectItem value={'30 Seconds'}>30 sec</SelectItem>
          <SelectItem value={'60 Seconds'}>60 sec</SelectItem>
      </SelectContent>
    </Select>
      
  </div>
  )
}

export default SelectDuration