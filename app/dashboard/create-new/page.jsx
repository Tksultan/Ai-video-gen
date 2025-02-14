"use client"
import React, { useState } from 'react'
import SelectTopic from './_components/SelectTopic.jsx'
import SelectStyle from './_components/SelectStyle.jsx';
import SelectDuration from './_components/SelectDuration.jsx';
import { Button } from '@/components/ui/button.jsx';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading.jsx';
import { v4 as uuidv4 } from 'uuid';


function CreateNewVideo() {

  const [formData, setFormData] = useState([]);

  const [genrationStatus, setGenrationSatus] = useState();

  const [loading, setLoading] = useState(false);

  const [videoScript, setVideoScript] = useState([]);

  const [audioFileUrl, setAudioFileUrl] = useState();

  const [captions, setCaptions] = useState();

  const [imageList, setImageList] = useState();



  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue !== "custom prompt" ? fieldValue : prev[fieldName],
    }));

  }

  const onCreateClickHandle = () => {
    getVideoScript();
  }
  //geting video script
  const getVideoScript = async () => {
    setLoading(true)
    setGenrationSatus('Writing script')
    const prompt = 'Write a script to generate ' + formData.duration + ' video on topic:"' + formData.topic + '" along with AI image prompt in ' + formData.imageStyle + ' format for each scene and give me result in JSON format with imagePrompt and ContentText as field'

    console.log(prompt)
    const result = await axios.post('/api/get-video-script', {
      prompt: prompt
    }).then(resp => {
      console.log(resp.data);
      setVideoScript(resp.data.result);
      GenrateAudio(resp.data.result);
    })
  }

  const GenrateAudio = async (videoScriptData) => {
    setLoading(true)
    setGenrationSatus('Genrating audio')
    let script = '';
    const id = uuidv4();
    videoScriptData.forEach(item => {
      script = script + item.contentText + '';
    })

    await axios.post('/api/genrate-audio', { text: script, id: id }).then(resp => {
      setAudioFileUrl(resp.data.result);
      GenrateAudioCaption(resp.data.result);
    }
    )

  }

  const GenrateAudioCaption = async (fileUrl) => {

    setGenrationSatus('Genrating captions')
    await axios.post('/api/genrate-caption', { audioFileUrl: fileUrl }).then(resp => {
      console.log(resp.data)
      setCaptions(resp?.data?.result)
      GenrateImage();
    })

  }

  const GenrateImage = () => {

    let images = []

    setGenrationSatus('Genrating audio')

    videoScript.forEach(async (element) => {
      await axios.post('/api/genrate-images', {
        prompt: element.imagePrompt,
      }).then(resp => {
        images.push(resp.data.result)
      })
      setImageList(images)
      
    })
    setLoading(false);
  }

  return (
    <div className='mt-14 md:px-20'>
      <h2 className='font-bold text-2xl text-primary text-center'>Create New Video</h2>

      <div className='mt-10 shadow-md p-10'>
        <SelectTopic onUserSelect={onHandleInputChange} />
      </div>
      <div className='mt-2 shadow-md p-10'>
        <SelectStyle onUserSelect={onHandleInputChange} />
      </div>
      <div className='mt-1 shadow-md p-10'>
        <SelectDuration onUserSelect={onHandleInputChange} />
      </div>
      <div className='flex items-center justify-center mt-7 '>
        <Button onClick={onCreateClickHandle} className="w-[90%] md:w-[50%] py-5">Create Video</Button>
      </div>


      <CustomLoading loading={loading} setLoading={setLoading} status={genrationStatus}/>
    </div>
  )
}

export default CreateNewVideo