"use client";
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import Image from 'next/image';
import { FaRegMessage } from 'react-icons/fa6';

export default function Blogs() {
  return (
    <div className='mx-4'>
        <section className="flex items-center py-5 gap-x-7">
  <div className="w-[500px] ml-2 border-t-2 border-gray-300"></div>

  <h2 className="text-[#159758] text-xl font-semibold">
    নতুন ব্লগ পড়ুন
  </h2>

  <div className="w-[500px] border-t-2 border-gray-300"></div>
</section>
<section>
    <Swiper
      slidesPerView={3}
      spaceBetween={20}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
      className="mySwiper"
    >
      <SwiperSlide>
  <div className="bg-white  rounded-lg shadow-md overflow-hidden group">
    {/* Image wrapper (important for zoom) */}
    <div className="relative mb-5 overflow-hidden">
        <div className="relative overflow-hidden">
  {/* Image */}
  <Image
    src="/blog-1.webp"
    alt="Blog 1"
    width={400}
    height={300}
    className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-110"
  />

  {/* Date badge – top left */}
  <span className="absolute top-3 left-3 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded shadow">
    12 Jan 2026
  </span>
  
</div>
    </div>
<span className="absolute inset-0 bottom-8 top-2 flex items-center justify-center">
    <span className="bg-[#159758] text-white text-[12px] font-medium px-2 py-1">
      GENERAL, HEALTH TIPS
    </span>
  </span>


    <div className="p-4  text-center">
      <h3 className="text-lg my-3 font-semibold text-gray-800 mb-2 line-clamp-2">
        খেজুর বরফি: চিনি ছাড়া মিষ্টি খাওয়ার স্বাস্থ্যকর বিকল্প
      </h3>

      <div className="flex justify-center my-3 items-center text-sm gap-x-2 text-gray-600 mb-2">
        <p>Posted by</p>

        <Image
          src="/author logo.webp"
          alt="Author"
          width={20}
          height={20}
          className="rounded-full"
        />

        <p>Web Editor</p>

        <div className="relative ml-2">
          <FaRegMessage className="text-lg" />
          <span className="absolute -top-1 -right-2 bg-[#159758] text-white text-[10px] px-1.5  rounded-full">
            0
          </span>
        </div>
      </div>

      {/* Description with ellipsis */}
      <p className="text-sm mt-4 text-gray-600 mb-3 line-clamp-2">
        বর্তমান সময়ে মিষ্টি খাবার মানেই স্বাস্থ্যঝুঁকি – এই ধারণাটি ক্রমেই শক্তিশালী হচ্ছে। এর প্রধান কারণ হলো পরিশোধিত চিনি (Refined Sugar), যা নিয়মিত গ্রহণ করলে ডায়াবেটিস, ওজন বৃদ্ধি, ইনসুলিন রেজিস্ট্যান্স এবং হৃদরোগের ঝুঁকি বাড়ায়।
      </p>

      <button className="text-[#159758] text-sm font-medium">
       CONTINUE READING 
      </button>
    </div>
  </div>
</SwiperSlide>


     <SwiperSlide>
  <div className="bg-white  rounded-lg shadow-md overflow-hidden group">
    {/* Image wrapper (important for zoom) */}
    <div className="relative mb-5 overflow-hidden">
        <div className="relative overflow-hidden">
  {/* Image */}
  <Image
    src="/blog-2.webp"
    alt="Blog 2"
    width={400}
    height={300}
    className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-110"
  />

  {/* Date badge – top left */}
  <span className="absolute top-3 left-3 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded shadow">
    28 DEC 2025
  </span>
  
</div>
    </div>
<span className="absolute inset-0 top-2 bottom-8 flex items-center justify-center">
    <span className="bg-[#159758] text-white text-[12px] font-medium px-2 py-1">
      GENERAL, HEALTH TIPS
    </span>
  </span>


    <div className="p-4 text-center">
      <h3 className="text-lg my-3 font-semibold text-gray-800 mb-2 line-clamp-2">
        পাহাড়ের বুকে জন্ম নেওয়া বিশুদ্ধতা: পাহাড়ি বন্য মধুর গল্প
      </h3>

      <div className="flex mt-3 justify-center items-center text-sm gap-x-2 text-gray-600 mb-3">
        <p>Posted by</p>

        <Image
          src="/author logo.webp"
          alt="Author"
          width={20}
          height={20}
          className="rounded-full"
        />

        <p>Web Editor</p>

        <div className="relative ml-2">
          <FaRegMessage className="text-lg" />
          <span className="absolute -top-1 -right-2 bg-[#159758] text-white text-[10px] px-1.5  rounded-full">
            0
          </span>
        </div>
      </div>

      {/* Description with ellipsis */}
      <p className="text-sm my-3 text-gray-600 line-clamp-2">
        বর্তমান সময়ে “খাঁটি মধু” শব্দটি খুবই প্রচলিত, কিন্তু বাস্তবে সত্যিকারের খাঁটি মধু পাওয়া দিন দিন কঠিন হয়ে উঠছে।
      </p>

      <button className="text-[#159758] text-sm font-medium ">
        CONTINUE READING 
      </button>
    </div>
  </div>

</SwiperSlide>

       <SwiperSlide>
  <div className="bg-white  rounded-lg shadow-md overflow-hidden group">
    {/* Image wrapper (important for zoom) */}
    <div className="relative mb-5 overflow-hidden">
        <div className="relative overflow-hidden">
  {/* Image */}
  <Image
    src="/blog-3.webp"
    alt="Blog 3"
    width={400}
    height={300}
    className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-110"
  />

  {/* Date badge – top left */}
  <span className="absolute top-3 left-3 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded shadow">
    12 Jan 2026
  </span>
  
</div>
    </div>
<span className="absolute inset-0 bottom-6 top-2 flex items-center justify-center">
    <span className="bg-[#159758] text-white text-[12px] font-medium px-2 py-1">
    HEALTH TIPS
    </span>
  </span>


    <div className="p-4 text-center">
      <h3 className="text-lg font-semibold text-gray-800 my-3 ">
       গ্রীন টি: প্রতিদিন এক কাপেই শরীরে ১০টি বৈজ্ঞানিক পরিবর্তন
      </h3>

      <div className="flex justify-center items-center text-sm gap-x-2 text-gray-600 my-3">
        <p>Posted by</p>

        <Image
          src="/author logo.webp"
          alt="Author"
          width={20}
          height={20}
          className="rounded-full"
        />

        <p>Web Editor</p>

        <div className="relative ml-2">
          <FaRegMessage className="text-lg" />
          <span className="absolute -top-1 -right-2 bg-[#159758] text-white text-[10px] px-1.5  rounded-full">
            0
          </span>
        </div>
      </div>

      {/* Description with ellipsis */}
      <p className="text-sm text-gray-600 my-3 line-clamp-2">
        গ্রীন টি হলো এমন একটি চা – যা প্রচুর পরিমাণে অ্যান্টিঅক্সিডেন্টে ভরা এক প্রাকৃতিক হেলথ ড্রিঙ্ক, যা প্রতিদিন মাত্র এক কাপ খেলেই শরীর পায় প্রয়োজনীয় এনার্জি ও শক্তি। 
      </p>

      <button className="text-[#159758] text-sm font-medium">
      CONTINUE READING 
      </button>
    </div>
  </div>
</SwiperSlide>
      <SwiperSlide>
  <div className="bg-white  rounded-lg shadow-md overflow-hidden group">
    {/* Image wrapper (important for zoom) */}
    <div className="relative mb-5 overflow-hidden">
        <div className="relative overflow-hidden">
  {/* Image */}
  <Image
    src="/blog4.webp"
    alt="Blog 4"
    width={400}
    height={300}
    className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-110"
  />

  {/* Date badge – top left */}
  <span className="absolute top-3 left-3 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded shadow">
   18 DEC 2025
  </span>
  
</div>
    </div>
<span className="absolute inset-0 bottom-8 top-2 flex items-center justify-center">
    <span className="bg-[#159758] text-white text-[12px] font-medium px-2 py-1">
      GENERAL
    </span>
  </span>


    <div className="p-4 text-center">
      <h3 className="text-lg my-3 font-semibold text-gray-800  line-clamp-2">
        প্রতিদিন রাতে ১ চামচ কালোজিরা তেল কেন ঘুম, হজম ও মুড তিনটিই ভালো করে?
      </h3>

      <div className="flex justify-center items-center text-sm gap-x-2 text-gray-600 my-3">
        <p>Posted by</p>

        <Image
          src="/author logo.webp"
          alt="Author"
          width={20}
          height={20}
          className="rounded-full"
        />

        <p>Web Editor</p>

        <div className="relative ml-2">
          <FaRegMessage className="text-lg" />
          <span className="absolute -top-1 -right-2 bg-[#159758] text-white text-[10px] px-1.5  rounded-full">
            0
          </span>
        </div>
      </div>

      {/* Description with ellipsis */}
      <p className="text-sm text-gray-600 my-3 line-clamp-2">
        কালোজিরা তেল (Black Seed Oil) শুধু একটি তেল নয় — এটি হাজার বছরের হারবাল মেডিসিন, যা প্রাচীন চিকিৎসা থেকে শুরু করে আজকের আধুনিক নিউট্রিশনেও সমানভাবে স্বীকৃত।
      </p>

      <button className="text-[#159758] text-sm font-medium">
        CONTINUE READING 
      </button>
    </div>
  </div>
</SwiperSlide>
    </Swiper>
</section>

<button className="block mx-auto mb-5 mt-8 font-semibold bg-[#159758] text-white py-2 text-[14px] px-4">
  VIEW MORE BLOGS
</button>

    </div>
  )
}
