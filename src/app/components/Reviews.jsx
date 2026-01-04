"use client";
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import Image from 'next/image';
export default function Reviews() {
  return (
    <div className='mt-20'>
        <p className='text-[15px] font-semibold text-center text-neutral-500'>CUSTOMER REVIEWS</p>
        <h2 className='text-3xl text-center mt-4 text-gray-800'>আমাদের গ্রাহকদের অভিজ্ঞতা</h2>
        <section className='mx-5'>
            <Swiper
                  slidesPerView={3}
                  spaceBetween={20}
                  pagination={{ clickable: true}}
                  
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
                  className="mySwiper my-10"
                >
                  <SwiperSlide>
              <div className="bg-white  overflow-hidden group">
                    <div className="">
              <Image
                src="/reviewer1.webp"
                alt="review 1"
                width={100}
                height={100}
                className="rounded-full mx-auto"
              />
            
            <p className='text-center my-5 text-neutral-500 text-sm '>I bought 2 kg of <span className='font-semibold text-black'>#Chia_Seeds</span> from <span className='font-semibold text-black'>Falaq Food</span> . The quality was very good and the packaging was premium. Thank you Falaq Food.❤️❤️</p>
                    <p className='font-bold text-sm text-center'>Ashish Mojumdar</p>
            </div>
               
              </div>
            </SwiperSlide>
                  <SwiperSlide>
              <div className="bg-white  overflow-hidden group">
                    <div className="">
              <Image
                src="/reviewer2.webp"
                alt="review 1"
                width={100}
                height={100}
                className="rounded-full mx-auto"
              />
            
            <p className='text-center my-5 text-neutral-500 text-sm '>কিছুক্ষণ আগেই হাতে পেলাম পূর্বে অর্ডারকৃত মধু🥰। এটা অসাধারণ😍। এটা এতোটাই ভালো যে আবার অর্ডার করলাম গিফট দিবো তাই❤️

</p>
                    <p className='font-bold text-sm text-center'>Md. Atikul Islam</p>
            </div>
               
              </div>
            </SwiperSlide>
                  <SwiperSlide>
              <div className="bg-white  overflow-hidden group">
                    <div className="">
              <Image
                src="/reviewer3.webp"
                alt="review 1"
                width={100}
                height={100}
                className="rounded-full mx-auto"
              />
            
            <p className='text-center my-5 text-neutral-500 text-sm '>আলহমদুলিল্লাহ। কিছুদিন পূর্বে চিয়াসীড। এখন দুই কেজি সরিষা মধু। প্রতিটি প্রোডাক্টেই আমি সেটিসফাইড। শুভকামনা রইল Falaq Food
এর জন্য... ❤️
</p>
                    <p className='font-bold text-sm text-center'>আব্দুল্লাহ আল হুমাইদী</p>
            </div>
               
              </div>
            </SwiperSlide>
                  <SwiperSlide>
              <div className="bg-white  overflow-hidden group">
                    <div className="">
              <Image
                src="/reviewer4.jpg"
                alt="review 1"
                width={100}
                height={100}
                className="rounded-full mx-auto"
              />
            
            <p className='text-center my-5 text-neutral-500 text-sm '>The quality was very good and the packaging was premium. Thank you Falaq Food 😍😍
</p>
                    <p className='font-bold text-sm text-center'>Shimran Sultana Sathi</p>
            </div>
               
              </div>
            </SwiperSlide>
                  <SwiperSlide>
              <div className="bg-white  overflow-hidden group">
                    <div className="">
              <Image
                src="/reviewer5.jpg"
                alt="review 5"
                width={100}
                height={100}
                className="rounded-full mx-auto"
              />
            
            <p className='text-center my-5 text-neutral-500 text-sm '>ধন্যবাদ Falaq Food কে এতো সুন্দর একটি হানি কম্বো দেওয়ার জন্য ❤️
</p>
                    <p className='font-bold text-sm text-center'>Abdul Malek</p>
            </div>
               
              </div>
            </SwiperSlide>
                  <SwiperSlide>
              <div className="bg-white  overflow-hidden group">
                    <div className="">
              <Image
                src="/reviewer6.webp"
                alt="review 6"
                width={100}
                height={100}
                className="rounded-full mx-auto"
              />
            
            <p className='text-center my-5 text-neutral-500 text-sm '>Got it.Delivered within 24 hours.Best quality & Product is also authentic
</p>
                    <p className='font-bold text-sm text-center'>Abu Zihad</p>
            </div>
               
              </div>
            </SwiperSlide>
            </Swiper>
        </section>
    </div>
  )

}
