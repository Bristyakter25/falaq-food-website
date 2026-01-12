"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function OrderDetailsPage() {
  const router = useRouter();
  const { id } = useParams(); 
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      router.push("/login");
      return;
    }

    fetch(`https://ecommerce-saas-server-wine.vercel.app/api/v1/order/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token, 
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
       
          const foundOrder = data.data.data.find((o) => o._id === id);
          setOrder(foundOrder || null);
        } else {
          alert("Failed to fetch order details");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Something went wrong while fetching order details");
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) return <p className="text-center py-10">Loading order details...</p>;
  if (!order)
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-400 mb-4">Order not found.</h2>
        <Link
          href="/dashboard"
          className="bg-[#159758] text-white px-8 py-3 rounded uppercase font-bold text-sm"
        >
          Back to Orders
        </Link>
      </div>
    );

  return (
    <div className="bg-white min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Order Details</h1>

        <div className="border p-4 rounded shadow-sm mb-6">
          <div className="flex justify-between mb-2">
            <span className="font-bold">Order ID:</span>
            <span>{order._id}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-bold">Invoice Number:</span>
            <span>{order.invoiceNumber}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-bold">Status:</span>
            <span>{order.status}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-bold">Total Amount:</span>
            <span>{order.totalAmount} ৳</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-bold">After Discount:</span>
            <span>{order.afterDiscountPrice} ৳</span>
          </div>
        </div>

        <div className="border p-4 rounded shadow-sm mb-6">
          <h2 className="font-bold mb-2">Products</h2>
          <ul className="ml-4 list-disc space-y-1">
            {order.orderItem.map((item) => (
              <li key={item._id}>
                {item.name} × {item.quantity} — {item.price} ৳
              </li>
            ))}
          </ul>
        </div>

        <div className="border p-4 rounded shadow-sm mb-6">
          <h2 className="font-bold mb-2">Shipping Address</h2>
          <p>{order.shippingAddress.firstName}</p>
          <p>{order.shippingAddress.address}</p>
          <p>{order.shippingAddress.phone}</p>
          {order.shippingAddress.note && <p>Note: {order.shippingAddress.note}</p>}
        </div>

        <div className="border p-4 rounded shadow-sm mb-6">
          <h2 className="font-bold mb-2">Payment Details</h2>
          <p>Method: {order.paymentDetails.method}</p>
          <p>Status: {order.paymentDetails.status}</p>
        </div>

        <Link
          href="/dashboard"
          className="bg-[#159758] text-white px-8 py-3 rounded uppercase font-bold text-sm"
        >
          Back to Orders
        </Link>
      </div>
    </div>
  );
}
