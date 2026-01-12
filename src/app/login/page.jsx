"use client";

import { Checkbox } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function LoginPage() {

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
const [phoneNumber, setPhoneNumber] = useState("");
const [phoneError, setPhoneError] = useState(false);

useEffect(() => {
  if (!phoneNumber) {
    setPhoneError(false);
    return;
  }

  const isValid = /^01\d{9}$/.test(phoneNumber);
  setPhoneError(!isValid);
}, [phoneNumber]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!phoneNumber || !password) {
      Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Phone number and password are required",
      });
      return;
    }

    setLoading(true);

    try {
     
      const res = await fetch(
        "https://ecommerce-saas-server-wine.vercel.app/api/v1/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber, password }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Login failed");
      }

      const token = data.data.accessToken;

      
      localStorage.setItem("token", token);

     
      const profileRes = await fetch(
        "https://ecommerce-saas-server-wine.vercel.app/api/v1/users/my-profile",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );

      const profileData = await profileRes.json();

    
      localStorage.setItem("user", JSON.stringify(profileData));

     
      Swal.fire({
        icon: "success",
        title: "Login successful",
        text: `Welcome back, ${profileData.data?.name || "user"}!`,
        timer: 2000,
        showConfirmButton: false,
      });

     
      setTimeout(() => {
        window.location.href = "/"; 
      }, 2000);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#333]">
      
      <div className="bg-[#f7f7f7] py-7 text-center border-b border-gray-200">
        <h1 className="text-4xl font-normal text-[#222] mb-4">My Account</h1>
        <nav className="text-sm text-gray-500">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="font-bold text-black">My Account</span>
        </nav>
      </div>

      
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0">
          
          <div className="md:pr-16">
            <h2 className="text-3xl font-normal mb-8 text-[#222]">Login</h2>

            <form className="space-y-6" onSubmit={handleLogin}>
              
              <div>
  <label className="block text-sm font-medium mb-2">
    Phone number <span className="text-red-500">*</span>
  </label>

  <input
    type="tel"
    inputMode="numeric"
    placeholder="01XXXXXXXXX"
    value={phoneNumber}
    maxLength={11}
    onChange={(e) => {
      const value = e.target.value.replace(/\D/g, "");
      setPhoneNumber(value);
    }}
    className={`w-full border p-3 outline-none transition-all
      ${phoneError
        ? "border-red-500 focus:border-red-500"
        : "border-gray-300 focus:border-[#10B981]"
      }`}
  />

  {phoneError && (
    <p className="text-red-500 text-sm mt-1">
      Enter a valid Bangladeshi phone number (11 digits, starts with 01)
    </p>
  )}
</div>

             
              <div>
                <label className="block text-sm font-medium mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 p-3 outline-none focus:border-[#10B981] transition-all"
                />
              </div>

             
              <p className="text-sm text-gray-500 leading-relaxed">
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our{" "}
                <a
                  href="#"
                  className="font-bold text-black hover:text-[#10B981] transition-colors"
                >
                  privacy policy
                </a>
                .
              </p>

             
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#10B981] text-white font-bold py-4 uppercase tracking-widest text-sm hover:bg-emerald-600 transition-colors disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            
            <div className="flex justify-between items-center mt-5">
              <Checkbox className="text-xs text-gray-500">Remember me</Checkbox>

              <button
                type="button"
                className="text-[#10B981] text-xs hover:underline"
              >
                Lost your password?
              </button>
            </div>
          </div>

        
          <div className="md:pl-16 md:border-l border-gray-200 flex flex-col items-center justify-start text-center">
            <h2 className="text-3xl font-normal mb-8 text-[#222]">Register</h2>

            <p className="text-[15px] text-gray-500 leading-relaxed mb-10 max-w-sm">
              Registering for this site allows you to access your order status
              and history. Just fill in the fields below, and we will get a new
              account set up for you in no time.
            </p>

            <Link href="/register">
              <button
                type="button"
                className="bg-[#f4f4f4] border border-gray-200 text-black font-bold py-3 px-10 uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors shadow-sm"
              >
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
