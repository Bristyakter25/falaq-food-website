"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    
    if (!formData.name || !formData.email || !formData.phoneNumber || !formData.password) {
      Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Please fill in all required fields.",
      });
      return;
    }

    const payload = {
      ...formData,
      userRole: "user",
      storeId: "0000122",
      status: "approved",
      isVerified: true,
    };

    setLoading(true);

    try {
      const res = await fetch(
        "https://ecommerce-saas-server-wine.vercel.app/api/v1/users/customer",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      Swal.fire({
        icon: "success",
        title: "Registration successful",
        text: "You can now login with your credentials",
        confirmButtonColor: "#10B981",
      }).then(() => {
        
        window.location.href = "/login";
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration failed",
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
            <h2 className="text-3xl font-normal mb-8 text-[#222]">Register</h2>

            <form className="space-y-6" onSubmit={handleRegister}>
            
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 outline-none focus:border-[#10B981] transition-all"
                />
              </div>

             
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 outline-none focus:border-[#10B981] transition-all"
                />
              </div>

             
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
          </div>

          
          <div className="md:pl-16 md:border-l border-gray-200 flex flex-col items-center justify-start text-center">
            <h2 className="text-3xl font-normal mb-8 text-[#222]">Login</h2>

            <p className="text-[15px] text-gray-500 leading-relaxed mb-10 max-w-sm">
              Already have an account? Login to access your order history and
              manage your account.
            </p>

            <Link href="/login">
              <button
                type="button"
                className="bg-[#f4f4f4] border border-gray-200 text-black font-bold py-3 px-10 uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors shadow-sm"
              >
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
