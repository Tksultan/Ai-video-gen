import Image from 'next/image'
import React, { useState } from 'react'

function SelectStyle({onUserSelect}) {

  const styleOptions=[
    {
      name:'Realistic',
      image:'/real.png'
    },
    {
      name:'Cartoon',
      image:'/cartoon.png'
    },{
      name:'Anime',
      image:'/anime.png'
    },
    {
      name:'Comic',
      image:'/comic.png'
    },
    {
      name:'WaterColor',
      image:'/watercolor.png'
    },
    
  ]

  const [selectedOption, setSelectedOption] = useState()
  return (
    <div className='mt-5'>
      <h2 className='font-bold text-xl text-primary'>Style</h2>
      <p className='text-gray-600'>select your video style</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-10 gap-5 lg:gap-10 z-0'>
        {styleOptions.map((item, index)=>(
          <div className={` mt-5 relative hover:scale-105 transition-all cursor-pointer ${
            selectedOption==item.name&&'border-4 scale-110 border-primary rounded-[10px] transition-all'
          } `} key={index}
          onClick={()=>{setSelectedOption(item.name)
            onUserSelect('imageStyle', item.name)
          }}>
            <Image className='h-30 object-cover rounded-t-md w-full' src={item.image} width={100} height={100} alt=''/>
            <p className={`bg-black text-m absolute p-1 text-center w-full text-white -mt-2 rounded-b-2xl ${
            selectedOption==item.name&&'bg-[#0000FF] rounded-md -mt-3 scale-110 border-black transition-all'
          } `}>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectStyle