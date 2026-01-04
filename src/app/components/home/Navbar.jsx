import React from 'react'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { FaRegUser } from "react-icons/fa6";
import { TbSpeakerphone } from "react-icons/tb";
export default function Navbar() {
  return (
    <section>
      <div>
        <h2 className="text-white text-md py-2 px-7 text-center bg-[#159758]">
        আমাদের যে কোন পণ্য অর্ডার করতে WhatsApp করুন:{' '}
        <a
          href="https://wa.me/8801765890646"
          target="_blank"
          rel="noopener noreferrer"
          className="underline "
        >
           +8801765890646
        </a>{' '}
        | অথবা কল করুন:{' '}
        <a
          href="tel:09613821489"
          className="underline "
        >
           09613-821489
        </a>
      </h2>
      </div>
     
    <div className="navbar bg-base-100 shadow-sm py-4 px-6">

      {/* LEFT — Hamburger (mobile only) */}
      <div className="navbar-start lg:hidden">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-56 p-2 shadow"
          >
            <li>
              <details>
                <summary>Shop</summary>
                <ul className="p-2">
                  <li><a>Honey</a></li>
                  <li><a>Dry Food</a></li>
                  <li><a>Mixed Food</a></li>
                  <li><a>Nuts & Seeds</a></li>
                  <li><a>Organic Food</a></li>
                  <li><a>Dates (খেজুর)</a></li>
                  <li><a>Masala (মসলা কম্বো)</a></li>
                  <li><a>Tea</a></li>
                </ul>
              </details>
            </li>

            <li><a>About</a></li>
            <li><a>Blog</a></li>
            <li><a>Contact</a></li>

            <li>
              <button className="w-full text-white bg-[#159758] py-2 rounded-md">
                Offer
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* CENTER — Logo (always centered on mobile) */}
      <div className="navbar-center">
        <img
          src="/falaq logo.webp"
          alt="logo"
          className="h-12 w-[120px] object-contain"
        />
      </div>

      {/* DESKTOP MENU */}
      <div className="navbar-center  hidden lg:flex">
        <ul className="menu menu-horizontal ml-7 text-sm font-medium gap-2">

          <li>
            <details>
              <summary>SHOP</summary>
              <ul className="p-2 w-[200px]">
                <li><a>Honey</a></li>
                <li><a>Dry Food</a></li>
                <li><a>Mixed Food</a></li>
                <li><a>Nuts & Seeds</a></li>
                <li><a>Organic Food</a></li>
                <li><a>Dates (খেজুর)</a></li>
                <li><a>Masala (মসলা কম্বো)</a></li>
                <li><a>Tea</a></li>
              </ul>
            </details>
          </li>

          <li><a>ABOUT</a></li>
          <li><a>BLOG</a></li>
          <li><a>CONTACT</a></li>

          <li>
            <button className="text-white ml-4 font-bold bg-[#159758] px-5 py-2 rounded-md">
                <TbSpeakerphone className='w-6 h-6 fill-neutral-50'/>
             OFFER
            </button>
          </li>
        </ul>
      </div>
      <label className="input flex ml-4  w-[880px] justify-between">
        <input type="search" required placeholder="Search for Products" />
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  
</label>

      {/* RIGHT — Icons */}
      <div className="navbar-end flex gap-4 text-xl">
        <FaRegUser className="cursor-pointer" />
        <div className="relative">
  <HiOutlineShoppingBag className="text-xl" />
  <span className="absolute -top-1 -right-2 bg-[#159758] text-white text-xs px-1.5 rounded">
    0
  </span> 
</div>
<p>0৳</p>
      </div>
    </div>
      
    </section>
  )
}
