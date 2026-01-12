"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { 
  FiPackage, 
  FiShoppingBag, 
  FiChevronRight, 
  FiClock, 
  FiCheckCircle, 
  FiAlertCircle,
  FiBox
} from "react-icons/fi";

export default function DashboardPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      router.push("/login");
      return;
    }

    fetch("https://ecommerce-saas-server-wine.vercel.app/api/v1/order/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token, 
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setOrders(data.data.data);
        } else {
          console.error("Failed to fetch orders", data);
          alert("Failed to fetch orders");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Something went wrong while fetching orders");
      })
      .finally(() => setLoading(false));
  }, []);

  
  const renderStatus = (status) => {
    const s = status?.toLowerCase();
    const config = {
      complete: { class: "bg-emerald-50 text-emerald-700 border-emerald-100", icon: <FiCheckCircle /> },
      pending: { class: "bg-amber-50 text-amber-700 border-amber-100", icon: <FiClock /> },
      cancelled: { class: "bg-rose-50 text-rose-700 border-rose-100", icon: <FiAlertCircle /> },
      default: { class: "bg-slate-50 text-slate-700 border-slate-100", icon: <FiPackage /> }
    };
    const style = config[s] || config.default;
    return (
      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold tracking-wide uppercase ${style.class}`}>
        {style.icon} {status || "Processing"}
      </div>
    );
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
      <span className="loading loading-spinner loading-md text-[#159758]"></span>
      <p className="text-slate-400 text-sm font-medium">Synchronizing orders...</p>
    </div>
  );

  if (orders.length === 0)
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <FiShoppingBag className="text-3xl text-slate-300" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">No orders found</h2>
        <p className="text-slate-500 mb-8">It seems you have not placed any orders yet. Once you do, they will appear here.</p>
        <Link href="/" className="btn btn-md bg-[#159758] hover:bg-[#127347] border-none text-white px-8 rounded-lg normal-case">
          Browse Collection
        </Link>
      </div>
    );

  return (
    <div className="bg-slate-50/50 min-h-screen pb-20">
    
      <div className="bg-white border-b border-slate-200 mb-8">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Order History</h1>
              <p className="text-slate-500 text-sm mt-1">Manage and track your recent store purchases.</p>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg border border-slate-200">
              <FiBox className="text-slate-500" />
              <span className="text-sm font-bold text-slate-700">{orders.length} Total Orders</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="group bg-white border border-slate-200 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-slate-200/50 overflow-hidden">
              
             
              <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Order ID</p>
                    <p className="text-sm font-mono font-semibold text-slate-600">#{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                  <div className="hidden sm:block h-8 w-[1px] bg-slate-200"></div>
                  <div className="hidden sm:block">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Order Total</p>
                    <p className="text-sm font-bold text-slate-900">{order.totalAmount} ৳</p>
                  </div>
                </div>
                <div>
                  {renderStatus(order.status)}
                </div>
              </div>

             
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {order.orderItem.map((item) => (
                    <div key={item._id} className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={item.imageURL || "https://via.placeholder.com/80"}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded-lg border border-slate-200 shadow-sm"
                        />
                        <span className="absolute -top-2 -right-2 bg-slate-900 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-800 text-sm truncate leading-none mb-1">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2">
                           <span className="text-xs font-semibold text-[#159758]">{item.price} ৳</span>
                           <span className="text-[10px] text-slate-400 uppercase tracking-tighter">/ {item.category}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

             
              <div className="px-6 py-4 bg-white border-t border-slate-50 flex justify-end">
                <button
                  onClick={() => router.push(`/dashboard/order/${order._id}`)}
                  className="group/btn btn btn-sm btn-ghost text-slate-600 hover:text-[#159758] normal-case font-bold gap-2"
                >
                  View Details
                  <FiChevronRight className="transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}