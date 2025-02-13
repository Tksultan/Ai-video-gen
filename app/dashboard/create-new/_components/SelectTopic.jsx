"use client"
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"



function SelectTopic() {
const options = [
  'custom prompts', 'Random AI Stoys', 'Scary story'
]

const [selectedOption, setSelectedOption] = useState();

  return (
    <div>
      <h2 className='font-bold text-xl text-primary'>Content</h2>
      <p className='text-gray-600'>What's the topic of your video</p>
      <Select onValueChange={(value)=>setSelectedOption(value)}>
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
          {options.map((item, index)=>(
            <SelectItem key={index} value={item}>{item}</SelectItem>
          ))}
        </SelectContent>
      </Select>
          {selectedOption=='custom prompts'&&

          <Textarea className="mt-3" placeholder="Write your Own prompt"/>
}
    </div>
  )
}

export default SelectTopic