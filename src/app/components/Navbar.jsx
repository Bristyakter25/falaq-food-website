"use client";

import React, { useEffect, useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { TbSpeakerphone } from "react-icons/tb";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { AiFillHeart } from "react-icons/ai";

import SignInDrawer from "./Auth/SignInDrawer";

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const { totalCount, subtotal, setIsDrawerOpen } = useCart();
  const [open, setOpen] = useState(false);

  // Lazy initial state avoids synchronous setState in useEffect
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser).data : null;
    }
    return null;
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
   
  };

  const renderUserIcon = () => {
    if (user && user.name) {
      const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
      return (
        <div className="w-8 h-8 bg-[#159758] text-white rounded-full flex items-center justify-center text-sm font-bold cursor-pointer">
          {initials || "U"}
        </div>
      );
    }
    return <FaRegUser className="cursor-pointer" />;
  };

 
  useEffect(() => {
    fetch(
      "https://ecommerce-saas-server-wine.vercel.app/api/v1/category/website/0000122"
    )
      .then((res) => res.json())
      .then((result) => {
        const uniqueCategories = Array.from(
          new Map((result?.data || []).map((cat) => [cat.parentCategory, cat]))
            .values()
        );
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section>
      <div>
        <h2 className="text-white text-md py-2 px-7 text-center bg-[#159758]">
          আমাদের যে কোন পণ্য অর্ডার করতে WhatsApp করুন:{" "}
          <a href="https://wa.me/8801765890646" target="_blank" className="underline">
            +8801765890646
          </a>{" "}
          | অথবা কল করুন: <a href="tel:09613821489" className="underline">09613-821489</a>
        </h2>
      </div>

      <div className="navbar bg-base-100 py-4 px-6">
        {/* Mobile menu */}
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-56 p-2">
              <li className="relative group">
                <span className="group flex items-center gap-1 cursor-pointer px-3 py-2 font-semibold">
                  SHOP
                  <RiArrowDropDownLine className="w-4 h-4 group-hover:hidden" />
                  <RiArrowDropUpLine className="w-4 h-4 hidden group-hover:block" />
                </span>
                <div className="absolute left-0 top-full hidden group-hover:block bg-white rounded-md p-3 w-[220px] z-50">
                  <ul className="space-y-2">
                    {categories.map((cat) => (
                      <li key={cat._id}>
                        <Link
                          href={`/category/${encodeURIComponent(cat.parentCategory)}`}
                          className="relative after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-[#159758] after:transition-all after:duration-300 hover:after:w-full block px-3 py-2 rounded font-medium text-gray-700"
                        >
                          {cat.parentCategory}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li><a className="px-3 py-2">About</a></li>
              <li><a className="px-3 py-2">Blog</a></li>
              <li><a className="px-3 py-2">Contact</a></li>
              <li>
                <button className="w-full text-white bg-[#159758] py-2 rounded-md">
                  Offer
                </button>
              </li>
            </ul>
          </div>
        </div>

      
        <div className="navbar-center">
          <img src="/falaq logo.webp" alt="logo" className="h-12 w-[120px] object-contain" />
        </div>

        {/* Desktop menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal ml-7 text-sm font-medium gap-2">
            <li className="relative group">
              <span className="group flex items-center gap-1 cursor-pointer px-3 py-2 font-semibold">
                SHOP <RiArrowDropDownLine className="w-4 h-4" />
              </span>
              <div className="absolute left-0 top-full hidden group-hover:block bg-white rounded-md p-3 w-[220px] z-50 shadow-lg">
                <ul className="space-y-2">
                  {categories.map((cat) => (
                    <li key={cat._id}>
                      <Link href={`/category/${encodeURIComponent(cat.parentCategory)}`} className="hover:text-[#159758]">
                        {cat.parentCategory}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li><a className="px-3 py-2">ABOUT</a></li>
            <li><a className="px-3 py-2">BLOG</a></li>
            <li><a className="px-3 py-2">CONTACT</a></li>
            <li>
              <button className="text-white ml-4 font-bold bg-[#159758] px-5 py-2 rounded-md flex items-center gap-1">
                <TbSpeakerphone className="w-6 h-6" /> OFFER
              </button>
            </li>
          </ul>
        </div>

       
       <label className="input flex ml-4 w-[880px] justify-between">
          <input type="search" required placeholder="Search for Products" />
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
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

      
        <div className="navbar-end flex gap-4 mr-3 text-xl items-center">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="cursor-pointer">{renderUserIcon()}</label>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40 mt-2">
                <li className="text-sm font-bold px-4 py-2 border-b">{user.name}</li>
                <li><button onClick={handleLogout} className="text-red-500">Logout</button></li>
              </ul>
            </div>
          ) : (
            <button onClick={() => setOpen(true)}><FaRegUser className="cursor-pointer" /></button>
          )}

          <SignInDrawer open={open} onClose={() => {
            setOpen(false);
            const storedUser = localStorage.getItem("user");
            if (storedUser) setUser(JSON.parse(storedUser).data);
          }} />

          <Link href="/wishlist" className="relative cursor-pointer">
            <AiFillHeart className="text-2xl text-red-500" />
          </Link>

          <div className="relative cursor-pointer" onClick={() => setIsDrawerOpen(true)}>
            <HiOutlineShoppingBag className="text-xl" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#159758] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                {totalCount}
              </span>
            )}
          </div>

          <p className="text-sm font-bold text-gray-700">{subtotal}৳</p>
        </div>
      </div>
    </section>
  );
}
