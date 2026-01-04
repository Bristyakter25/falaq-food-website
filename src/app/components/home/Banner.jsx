import Image from 'next/image'
import React from 'react'

export default function Banner() {
  return (
    <div className='mx-4 my-16'>
        <Image src="/falaq banner.webp" alt="Banner Image" width={1920} height={600} />
    </div>
  )
}
