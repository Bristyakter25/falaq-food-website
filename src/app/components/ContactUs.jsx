import React from 'react'
import { FaRegCalendarCheck } from 'react-icons/fa6'

export default function ContactUs() {
  return (
    <div className="bg-gradient-to-r mt-20 from-[#4fe69d] to-white py-7 px-5 ">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
        {/* Left text section */}
        <section className="md:w-2/3">
          <h2 className="text-2xl md:text-3xl font-semibold text-white md:text-black">
            Join 100+ Companies That Trust{" "}
            <span className=" md:text-[#159758]">Falaq Food</span>
          </h2>
          <p className="my-7 text-sm md:text-base md:text-gray-800">
            Whether you’re a company, reseller, or retailer — we’re ready to collaborate. 
            We offer attractive corporate deals, custom pricing, and reliable delivery to help fuel your operations with goodness.
          </p>
        </section>

        {/* Right button section */}
        <section>
          <button className="flex mt-10 items-center gap-2 bg-[#159758] text-white text-lg font-semibold py-3 px-12  hover:bg-green-600 transition">
            LET’S SCHEDULE A MEETING <FaRegCalendarCheck />
          </button>
        </section>
      </div>
    </div>
  )
}
