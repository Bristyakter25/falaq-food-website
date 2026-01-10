"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

export default function CartSidebar() {
  const { cartItems, isDrawerOpen, setIsDrawerOpen, subtotal, removeFromCart } = useCart();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      
      <div className="relative w-full max-w-sm bg-white h-full shadow-xl flex flex-col p-6 animate-slide-in">
      
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <button
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close Cart"
            className="text-gray-600 hover:text-gray-800 transition"
          >
            <IoClose size={28} />
          </button>
        </div>

        
        <div className="flex-grow overflow-y-auto py-4 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 py-10">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="flex gap-4 border-b pb-4">
                <img
                  src={item.imageURLs?.[0] || "/placeholder.png"}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-grow">
                  <h3 className="text-sm font-semibold leading-tight">{item.name}</h3>
                
                  {item.selectedAttributes && (
                    <div className="text-xs text-gray-500 mt-1">
                      {Object.entries(item.selectedAttributes).map(([key, value]) => (
                        <span key={key} className="mr-2">
                          {key}: {value}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-gray-500 text-sm mt-1">
                    {item.quantity} × {(item.price ?? item.salePrice ?? item.productPrice).toLocaleString()} ৳
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 text-xs uppercase hover:text-red-600 font-semibold transition"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

     
        <div className="border-t pt-4 space-y-3">
          <div className="flex justify-between text-lg font-bold">
            <span>Subtotal:</span>
            <span>{subtotal.toLocaleString()} ৳</span>
          </div>

          <Link href="/cart">
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="w-full border-2 border-[#159758] text-[#159758] py-3 font-bold uppercase tracking-wider mb-2 hover:bg-[#f0fdf4] transition"
            >
              View Cart
            </button>
          </Link>
          <Link href="/checkout">
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="w-full bg-[#159758] text-white py-3 font-bold uppercase tracking-wider hover:bg-black transition"
            >
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
