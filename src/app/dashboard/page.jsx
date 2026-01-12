"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
        Authorization: token, // your instructor doesn’t use Bearer
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setOrders(data.data.data); // ✅ map here
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

  if (loading) return <p className="text-center py-10">Loading orders...</p>;

  if (orders.length === 0)
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-400 mb-4">No orders found.</h2>
        <Link href="/" className="bg-[#159758] text-white px-8 py-3 rounded uppercase font-bold text-sm">
          Go Shopping
        </Link>
      </div>
    );

  return (
    <div className="bg-white min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded shadow-sm">
              <div className="flex justify-between mb-2">
                <span className="font-bold">Order ID:</span>
                <span className="text-sm text-gray-500">{order._id}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="font-bold">Status:</span>
                <span className="text-sm text-gray-500">{order.status || "Pending"}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="font-bold">Total:</span>
                <span className="text-sm text-gray-500">{order.totalAmount} ৳</span>
              </div>

              <div className="mb-2">
                <span className="font-bold">Products:</span>
                <ul className="ml-4 list-disc text-sm text-gray-600">
                  {order.orderItem.map((item) => (
                    <li key={item._id}>
                      {item.name} × {item.quantity} — {item.price} ৳
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => router.push(`/dashboard/order/${order._id}`)}
                className="mt-2 text-xs text-[#159758] hover:underline"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
