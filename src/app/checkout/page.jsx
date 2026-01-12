"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, subtotal, originalSubtotal, clearCart } = useCart();
  const [shipping, setShipping] = useState(50);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    notes: ""
  });
  const [mounted, setMounted] = useState(false); 

  // Wait for client-side mount

if (!cartItems) return <p>Loading...</p>;
  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-400 mb-4">Your cart is empty.</h2>
        <Link href="/" className="bg-[#159758] text-white px-8 py-3 rounded uppercase font-bold text-sm">Return to Shop</Link>
      </div>
    );
  }

const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");

  if (!token || !savedUser) {
    alert("Please login first to place an order");
    router.push("/login");
    return;
  }

  const userData = JSON.parse(savedUser);
  const userId = userData.data?._id;

  // Validate required fields before sending
  if (!formData.name || !formData.mobile || !formData.address) {
    alert("Please fill all required fields!");
    return;
  }

  const orderData = {
  orderItem: cartItems.map(item => ({
    product: item.productId || item._id,
    name: item.name || "Unnamed Product",
    price: item.price || 0,
    quantity: item.quantity || 1,
    originalProductPrice: item.originalProductPrice || item.price || 0,
    imageURL: item.selectedImage || item.image || "https://via.placeholder.com/150",
    ...(item.variantId && { variant: item.variantId }),
    category: Array.isArray(item.category) ? item.category[0] : item.category || "Uncategorized"
  })),
  user: userId || "",
  shippingPrice: shipping || 0,
  mobileNumber: formData.mobile,
  fullName: formData.name,
  totalAmount: subtotal + shipping,
  afterDiscountPrice: subtotal + shipping,
  originalProductPrice: originalSubtotal || subtotal,
  couponDiscount: 0,
  orderType: "website",
  shippingAddress: {
    address: formData.address,
    email: userData.data?.email || "",
    firstName: formData.name,
    phone: formData.mobile,
    note: formData.notes || ""
  },
  paymentDetails: {
    method: "COD",
    status: "pending"
  }
};


  console.log("Token:", token);
  console.log("User ID:", userId);
  console.log("Cart Items:", cartItems);
  console.log("Form Data:", formData);
  console.log("Order Payload:", orderData);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "store-id": process.env.NEXT_PUBLIC_STORE_ID,
        "Authorization": token // or `Bearer ${token}` if backend expects it
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Server Success Response:", data);
      alert("Order Successful!");
      clearCart();
      router.push("/dashboard");
    } else {
      console.log("Server Error Response:", data);
      if (data.errorMessages) {
        data.errorMessages.forEach(err => console.log("Validation Error:", err));
      }
      alert(data.message || "Order failed");
    }
  } catch (error) {
    console.error("Order error:", error);
    alert("Something went wrong connecting to the server.");
  }
};



  return (
    <div className="bg-white min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit}>
          {/* ================= Billing & Shipping ================= */}
          <section className="mb-12">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-6 tracking-tight uppercase">
              Billing & Shipping
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  আপনার নাম <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="আপনার নাম লিখুন..."
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#159758]"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  মোবাইল নম্বর <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="tel"
                  placeholder="আপনার ফোন নাম্বার দিন"
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#159758]"
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  আপনার ঠিকানা <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="আপনার ঠিকানা লিখুন"
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#159758]"
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">
                  Order notes <span className="text-gray-300 font-normal">(optional)</span>
                </label>
                <textarea
                  rows="3"
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#159758]"
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                ></textarea>
              </div>
              <div className="border rounded-sm overflow-hidden">
                <label className="flex items-center justify-between px-4 py-4 border-b border-gray-100 cursor-pointer bg-gray-50/30">
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="shipping" 
                      checked={shipping === 50}
                      onChange={() => setShipping(50)}
                      className="accent-[#159758] w-4 h-4"
                    />
                    <span className="text-sm text-gray-600">Inside Dhaka:</span>
                  </div>
                  <span className="text-sm font-bold text-[#159758]">50 ৳</span>
                </label>
                <label className="flex items-center justify-between px-4 py-4 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="shipping" 
                      checked={shipping === 80}
                      onChange={() => setShipping(80)}
                      className="accent-[#159758] w-4 h-4"
                    />
                    <span className="text-sm text-gray-600">Outside Dhaka:</span>
                  </div>
                  <span className="text-sm font-bold text-[#159758]">80 ৳</span>
                </label>
              </div>
            </div>
          </section>

          {/* ================= Your Order ================= */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 text-center mb-8 uppercase tracking-widest">
              Your Order
            </h2>
            <div className="border-t border-gray-200">
              <div className="flex justify-between py-3 border-b border-gray-100 text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                <span>Product</span>
                <span>Subtotal</span>
              </div>
              {cartItems.map((item, index) => (
                <div
                  key={`${item._id}-${JSON.stringify(item.selectedAttributes)}-${index}`}
                  className="flex items-center justify-between py-4 border-b border-gray-100"
                >
                  <div className="flex items-center gap-3">
                     <img
                        src={item.selectedImage || item.image || "/placeholder.png"}
                        alt={item.name}
                        className="w-20 h-20 object-cover border border-gray-100"
                      />
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-600 font-bold max-w-[250px]">
                        {item.name} <span className="text-gray-400 font-normal lowercase ml-1">× {item.quantity}</span>
                      </span>
                      {item.selectedAttributes && (
                        <div className="text-xs text-gray-400 ml-1 mt-1">
                          {Object.entries(item.selectedAttributes).map(([key, value]) => (
                            <span key={key} className="mr-2">{key}: {value}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-400">
                    {(item.price ?? 0) * item.quantity} ৳
                  </span>
                </div>
              ))}
              <div className="flex justify-between py-4 border-b border-gray-100 text-xs text-gray-400 font-bold uppercase tracking-widest">
                <span>Subtotal</span>
                <span>{subtotal} ৳</span>
              </div>
              <div className="flex justify-between py-4 text-xs font-bold uppercase tracking-widest border-b border-gray-100">
                <span className="text-gray-800">Total</span>
                <span className="text-[#159758] text-lg">{subtotal + shipping} ৳</span>
              </div>
            </div>
          </section>

          {/* ================= Payment Method ================= */}
          <section className="bg-gray-50 p-6 rounded-sm mb-6">
            <div className="flex flex-col gap-4">
              <div className="font-bold text-xs text-gray-700">Cash on delivery</div>
              <div className="relative bg-white p-4 border border-gray-100 text-xs text-gray-500 leading-relaxed shadow-sm">
                Pay with cash upon delivery.
                <div className="absolute -top-2 left-4 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45"></div>
              </div>
            </div>
          </section>

          <p className="text-[10px] text-gray-400 mb-8 leading-relaxed">
            Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
          </p>

          <button 
            type="submit"
            className="w-full bg-[#159758] text-white py-4 font-black text-sm uppercase tracking-widest hover:bg-black transition-all"
          >
            Place Order {subtotal + shipping} ৳
          </button>
        </form>
      </div>
    </div>
  );
}
