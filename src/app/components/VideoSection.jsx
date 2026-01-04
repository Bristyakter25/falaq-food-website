import React from 'react'

export default function VideoSection() {
  return (
    <div className='mb-10 mx-5'>
        <h2 className='text-[#159758] text-center text-3xl font-medium mt-16 mb-8'>VIDEO GALLERY</h2>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
           <iframe
            className="w-full h-[290px]"
            src="https://www.youtube.com/embed/b4pkGkdp9nc"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <iframe
            className="w-full h-[290px]"
            src="https://www.youtube.com/embed/EI1HVan4GNQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          /> 
           <iframe
            className="w-full h-[290px]"
            src="https://www.youtube.com/embed/ke4_5KphB5Y"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <iframe
            className="w-full h-[290px]"
            src="https://www.youtube.com/embed/ez5mPpC7hLU"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          /> 
           
        </div>
    </div>
  )
}
