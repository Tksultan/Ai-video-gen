"use client"
import React, { useState } from 'react'
import SelectTopic from './_components/SelectTopic.jsx'
import SelectStyle from './_components/SelectStyle.jsx';
import SelectDuration from './_components/SelectDuration.jsx';
import { Button } from '@/components/ui/button.jsx';
import axios from 'axios';

function CreateNewVideo() {

  const [formData, setFormData] = useState([]);

  const onHandleInputChange= (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue !== "custom prompt" ? fieldValue : prev[fieldName],
    }));

  }

  const onCreateClickHandle=()=>{
    getVideoScript();
  }
  //geting video script
  const getVideoScript=()=>{
    const prompt = 'Write a script to generate '+formData.duration+' video on topic:"'+formData.topic+'" along with AI image prompt in '+formData.imageStyle+' format for each scene and give me result in JSON format with imagePrompt and ContentText as field'

    console.log(prompt)
    //const result = await axios.post('/api/get-video-script',{
      //prompt:
    //})
  }
  return (
    <div className='md:px-20'>
      <h2 className='font-bold text-2xl text-primary text-center'>Create New Video</h2>

      <div className='mt-10 shadow-md p-10'>
        <SelectTopic onUserSelect={onHandleInputChange}/>
      </div>
      <div className='mt-2 shadow-md p-10'>
        <SelectStyle onUserSelect={onHandleInputChange}/>
      </div>
      <div className='mt-2 shadow-md p-10'>
        <SelectDuration onUserSelect={onHandleInputChange}/>
      </div>
      <div className='flex items-center justify-center mt-7 '>
      <Button onClick={onCreateClickHandle} className="w-[90%] md:w-[50%] py-5">Create Video</Button>
      </div>
    </div>
  )
}

export default CreateNewVideo