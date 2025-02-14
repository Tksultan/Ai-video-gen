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

function SelectTopic({ onUserSelect }) {
  const options = [
    'Custom prompt', 'Random AI Stories', 'Scary Story'
  ];

  const [selectedOption, setSelectedOption] = useState(""); 

  return (
    <div>
      <h2 className='font-bold text-xl text-primary'>Content</h2>
      <p className='text-gray-600'>What's the topic of your video</p>
      
      {/* Dropdown for topic selection */}
      <Select onValueChange={(value) => {
        setSelectedOption(value);
        if (value !== 'Custom prompt') {
          onUserSelect('topic', value); 
        }
      }}>
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
          {options.map((item, index) => (
            <SelectItem key={index} value={item}>{item}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* textarea for "custom prompt"*/}
      {selectedOption === 'Custom prompt' && (
        <Textarea 
          onChange={(e) => onUserSelect('topic', e.target.value)} 
          className="mt-3" 
          placeholder="Write your own prompt"
        />
      )}
    </div>
  );
}

export default SelectTopic;
