"use client"
import React, { useContext, useEffect, useState } from 'react'
import SelectTopic from './_components/SelectTopic.jsx'
import SelectStyle from './_components/SelectStyle.jsx';
import SelectDuration from './_components/SelectDuration.jsx';
import { Button } from '@/components/ui/button.jsx';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading.jsx';
import { v4 as uuidv4 } from 'uuid';
import { VideoDataContext } from '@/app/_context/videoDataContext.jsx';
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs/db.js';
import { DbVideoData } from '@/configs/schema.js';


function CreateNewVideo() {

  const [formData, setFormData] = useState([]);

  const [genrationStatus, setGenrationSatus] = useState();

  const [loading, setLoading] = useState(false);

  const [videoScript, setVideoScript] = useState([]);

  const { videoData, setVideoData } = useContext(VideoDataContext);
  const { user } = useUser();

  const [audioFileUrl, setAudioFileUrl] = useState();

  const [captions, setCaptions] = useState([]);

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
      setVideoData(prev => ({
        ...prev,
        'videoScript': resp.data.result
      }))
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
      setVideoData(prev => ({
        ...prev,
        'audiofile': resp.data.result
      }))
      GenrateAudioCaption(resp.data.result);
    }
    )

  }

  const GenrateAudioCaption = async (fileUrl) => {
    try {
      setGenrationSatus('Generating captions');

      const resp = await axios.post('/api/genrate-caption', { audioFileUrl: fileUrl });


      const captiondata = resp.data.Result;

      setCaptions(captiondata);

      setVideoData(prev => ({
        ...prev,
        'audiocaptions': captiondata
      }));

      GenrateImage();
    } catch (error) {
      console.error('Error generating captions:', error);
    }
  };


  {/* const GenrateAudioCaption = async (fileUrl) => {

    setGenrationSatus('Genrating captions')
    await axios.post('/api/genrate-caption', { audioFileUrl: fileUrl }).then(resp => {
      const captiondata = resp.data.result;
      setCaptions(captiondata)
      console.log(captiondata)
      setVideoData(prev=>({
        ...prev,
        'videoScript':captions
      }))
      GenrateImage();
    })

  }*/}

  const GenrateImage = () => {

    let images = []

    setGenrationSatus('Genrating audio')

    videoScript.forEach(async (element) => {
      //try{
      await axios.post('/api/genrate-images', {
        prompt: element.imagePrompt,
      }).then(resp => {
        images.push(resp.data.result)
      })
      //}
      //catch(e){
      console.log({ 'error': e })
      //}
      setVideoData(prev => ({
        ...prev,
        'images': images
      }))
    })
    setImageList(images)
    setLoading(false);
  }

  useEffect(() => {
      if (!videoData || typeof videoData !== "object") {
    console.warn("videoData is undefined or null", videoData);
    return;
  }

    console.log(videoData);

    if (Object.keys(videoData).length == 3) {
      saveVideoData(videoData);
    }
  }, [videoData]);



  const saveVideoData = async (VideoData) => {
    setLoading(true)
    setGenrationSatus('Making video')

    const result = await db.insert(VideoData).values({
      script: videoData?.videoScript,
      audioFileUrl: videoData?.audiofile,
      captions: videoData?.audiocaptions,
      imageList: videoData?.imageList,
      createdBy: user?.primaryEmailAddress?.emailAddress
    }).returning({ id: VideoData?.id });

    console.log(result);
    setLoading(false)
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


      <CustomLoading loading={loading} setLoading={setLoading} status={genrationStatus} />
    </div>
  )
}

export default CreateNewVideo