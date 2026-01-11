import { Checkbox, Form } from 'antd';
import Link from 'next/link';
import React from 'react'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#333]">
     
      <div className="bg-[#f7f7f7] py-7 text-center border-b border-gray-200">
        <h1 className="text-4xl font-normal text-[#222] mb-4">My Account</h1>
        <nav className="text-sm text-gray-500">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="font-bold text-black">My Account</span>
        </nav>
      </div>

      
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0">
          
          
          <div className="md:pr-16">
            <h2 className="text-3xl font-normal mb-8 text-[#222]">Login</h2>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  className="w-full border border-gray-300 p-3 outline-none focus:border-[#10B981] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <input 
                  type="password" 
                  className="w-full border border-gray-300 p-3 outline-none focus:border-[#10B981] transition-all"
                />
              </div>

              

              <p className="text-sm text-gray-500 leading-relaxed">
                Your personal data will be used to support your experience throughout this website, 
                to manage access to your account, and for other purposes described in our{" "}
                <a href="#" className="font-bold text-black hover:text-[#10B981] transition-colors">
                  privacy policy
                </a>.
              </p>

              <button 
                type="submit"
                className="w-full bg-[#10B981] text-white font-bold py-4 uppercase tracking-widest text-sm hover:bg-emerald-600 transition-colors"
              >
                Login
              </button>


            </form>
             <div className="flex justify-between items-center mt-5">
                      
                        <Checkbox className="text-xs text-gray-500">Remember me</Checkbox>
                      
                      <a href="#" className="text-[#10B981] text-xs hover:underline">
                        Lost your password?
                      </a>
                    </div>
          </div>

         
          <div className="md:pl-16 md:border-l border-gray-200 flex flex-col items-center justify-start text-center">
            <h2 className="text-3xl font-normal mb-8 text-[#222]">Login</h2>
            
            <p className="text-[15px] text-gray-500 leading-relaxed mb-10 max-w-sm">
              Registering for this site allows you to access your order status and history. 
              Just fill in the fields below, and we will get a new account set up for you in no time. 
              We will only ask you for information necessary to make the purchase process faster and easier.
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
