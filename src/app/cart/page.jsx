"use client";

import React, { useState } from "react";

import Link from "next/link";
import { IoCheckmarkSharp, IoCloseOutline } from "react-icons/io5";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();
  const [shipping, setShipping] = useState(50); // Default to Inside Dhaka

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-32">
        <h2 className="text-2xl font-bold text-gray-400 mb-4">Your cart is currently empty.</h2>
        <Link href="/" className="bg-[#159758] text-white px-8 py-3 rounded uppercase font-bold text-sm">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-sans">
    
      <div className="flex justify-center items-center gap-4 text-gray-400 uppercase text-sm tracking-widest mb-12">
        <span className="text-gray-800 border-b-2 border-[#159758] pb-1 font-bold">Shopping Cart</span>
        <span>→</span>
        <span className="hover:text-gray-600 cursor-pointer">Checkout</span>
        <span>→</span>
        <span className="hover:text-gray-600 cursor-pointer">Order Complete</span>
      </div>

      {/* 2. Cart Updated Alert */}
      <div className="bg-[#159758] text-white px-6 py-4 rounded-sm flex items-center gap-3 mb-8 shadow-sm">
        <div className="bg-white/20 p-1 rounded-full">
          <IoCheckmarkSharp className="text-white text-lg" />
        </div>
        <p className="text-[15px] font-medium">Cart updated.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* 3. Left Side: Cart Table */}
        <div className="flex-grow w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-gray-400 text-xs uppercase tracking-widest">
                <th className="pb-4 font-normal text-left"></th>
                <th className="pb-4 font-normal text-left">Product</th>
                <th className="pb-4 font-normal text-right">Price</th>
                <th className="pb-4 font-normal text-center">Quantity</th>
                <th className="pb-4 font-normal text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {cartItems.map((item) => (
                <tr key={item._id} className="group">
                  {/* Remove Button */}
                  <td className="py-6 w-8">
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="text-gray-400 hover:text-red-500 transition"
                    >
                      <IoCloseOutline size={22} />
                    </button>
                  </td>
                  {/* Product Info */}
                  <td className="py-6">
                    <div className="flex items-center gap-4">
                      <img src={item.imageURLs?.[0]} alt="" className="w-20 h-20 object-cover border border-gray-100" />
                      <span className="text-gray-700 font-bold text-[15px]">{item.name}</span>
                    </div>
                  </td>
                  {/* Price */}
                  <td className="py-6 text-right text-gray-500 font-medium">
                    {(item.salePrice || item.productPrice).toLocaleString()} ৳
                  </td>
                  {/* Quantity Selector */}
                  <td className="py-6">
                    <div className="flex justify-center">
                      <div className="flex items-center border border-gray-200 rounded-sm">
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-500"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 text-sm font-bold min-w-[40px] text-center">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-500"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </td>
                  {/* Item Subtotal */}
                  <td className="py-6 text-right text-[#159758] font-bold text-lg">
                    {((item.salePrice || item.productPrice) * item.quantity).toLocaleString()} ৳
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Coupon Code Section */}
          <div className="flex flex-wrap gap-4 mt-8">
            <input 
              type="text" 
              placeholder="Coupon code" 
              className="border px-4 py-2.5 w-64 focus:outline-none focus:border-[#159758]"
            />
            <button className="bg-[#159758] text-white px-8 py-2.5 font-bold text-sm uppercase tracking-widest hover:bg-black transition">
              Apply Coupon
            </button>
          </div>
        </div>

        {/* 4. Right Side: Cart Totals Sidebar */}
        <div className="w-full lg:w-[400px] border p-8 bg-white">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-4 mb-6 uppercase tracking-tight">Cart Totals</h2>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center text-sm border-b pb-4">
              <span className="text-gray-600 font-medium">Subtotal</span>
              <span className="text-gray-400 font-medium">{subtotal.toLocaleString()} ৳</span>
            </div>

            <div className="flex justify-between border-b pb-6">
              <span className="text-gray-600 font-medium text-sm">Shipping</span>
              <div className="text-right space-y-3">
                <label className="flex items-center justify-end gap-2 text-sm text-gray-500 cursor-pointer">
                  Inside Dhaka: <span className="font-bold text-black">50 ৳</span>
                  <input 
                    type="radio" 
                    name="shipping" 
                    checked={shipping === 50} 
                    onChange={() => setShipping(50)}
                    className="accent-[#159758] w-4 h-4" 
                  />
                </label>
                <label className="flex items-center justify-end gap-2 text-sm text-gray-500 cursor-pointer">
                  Outside Dhaka: <span className="font-bold text-black">80 ৳</span>
                  <input 
                    type="radio" 
                    name="shipping" 
                    checked={shipping === 80} 
                    onChange={() => setShipping(80)}
                    className="accent-[#159758] w-4 h-4" 
                  />
                </label>
                <p className="text-xs text-gray-400 mt-2 italic">Shipping to <span className="font-bold text-gray-700">Dhaka</span>.</p>
                <button className="text-[#159758] text-xs font-bold hover:underline">Change address</button>
              </div>
            </div>

            <div className="flex justify-between items-center py-4">
              <span className="text-gray-600 font-medium">Total</span>
              <span className="text-[#159758] font-bold text-2xl">{(subtotal + shipping).toLocaleString()} ৳</span>
            </div>

            <Link href="/checkout">
              <button className="w-full bg-[#159758] text-white py-4 font-black text-sm uppercase tracking-widest hover:bg-black transition-all">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}