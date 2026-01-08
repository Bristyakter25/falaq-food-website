"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { BsGrid3X3GapFill, BsGridFill } from "react-icons/bs";
import { useCart } from "@/context/CartContext";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useWishlist } from "@/context/WishlistContext";

export default function CategoryClient({ initialProducts, categoryName }) {
  const [sortBy, setSortBy] = useState("latest");
  const [gridCols, setGridCols] = useState(3);

  const [tempMinPrice, setTempMinPrice] = useState(0);
  const [tempMaxPrice, setTempMaxPrice] = useState(4000);

  const { addToCart } = useCart();

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(4000);
  const [quantity] = useState(1);

  const { toggleWishlist, isInWishlist, isLoaded } = useWishlist();

  const filteredProducts = useMemo(() => {
    let updatedList = [...initialProducts];

    updatedList = updatedList.filter(
      (p) => p.salePrice >= minPrice && p.salePrice <= maxPrice
    );

    if (sortBy === "low-high") {
      updatedList.sort((a, b) => a.salePrice - b.salePrice);
    } else if (sortBy === "high-low") {
      updatedList.sort((a, b) => b.salePrice - a.salePrice);
    } else {
      updatedList.sort((a, b) => b._id.localeCompare(a._id));
    }

    return updatedList;
  }, [initialProducts, minPrice, maxPrice, sortBy]);

  if (!isLoaded) return null;

  return (
    <div className="bg-white min-h-screen">
      <div className="flex items-center justify-center gap-4 py-10 border-b border-gray-100">
        <Link href="/" className="text-3xl text-gray-400 hover:text-black">
          ←
        </Link>
        <h1 className="text-5xl font-normal text-gray-800 tracking-tight">
          {categoryName}
        </h1>
      </div>

      <div className="lg:w-[1024px] w-[380px] mx-auto py-8 flex flex-col lg:flex-row gap-10">
        <aside className="w-full lg:w-40 flex-shrink-0">
          <div className="sticky top-10">
            <h3 className="font-bold text-sm uppercase tracking-wider mb-6 pb-2 border-b-2 border-gray-100">
              Filter by Price
            </h3>

            <div className="relative h-6 flex items-center mb-4">
              <div className="absolute w-full h-1 bg-gray-200 rounded-full" />
              <div
                className="absolute h-1 bg-[#159758] rounded-full"
                style={{
                  left: `${(tempMinPrice / 4000) * 100}%`,
                  right: `${100 - (tempMaxPrice / 4000) * 100}%`,
                }}
              />

              <input
                type="range"
                min="0"
                max="4000"
                value={tempMinPrice}
                onChange={(e) =>
                  setTempMinPrice(
                    Math.min(Number(e.target.value), tempMaxPrice - 100)
                  )
                }
                className="absolute w-full appearance-none bg-transparent pointer-events-none cursor-pointer accent-[#159758] [&::-webkit-slider-thumb]:pointer-events-auto"
              />

              <input
                type="range"
                min="0"
                max="4000"
                value={tempMaxPrice}
                onChange={(e) =>
                  setTempMaxPrice(
                    Math.max(Number(e.target.value), tempMinPrice + 100)
                  )
                }
                className="absolute w-full appearance-none bg-transparent pointer-events-none cursor-pointer accent-[#159758] [&::-webkit-slider-thumb]:pointer-events-auto"
              />
            </div>

            <div className="flex flex-col gap-4 text-sm">
              <p className="text-gray-500 font-medium">
                Price:{" "}
                <span className="text-black font-bold">
                  {tempMinPrice} ৳ — {tempMaxPrice} ৳
                </span>
              </p>

              <button
                onClick={() => {
                  setMinPrice(tempMinPrice);
                  setMaxPrice(tempMaxPrice);
                }}
                className="w-fit bg-gray-100 px-6 py-2 text-xs font-bold hover:bg-[#159758] hover:text-white transition uppercase tracking-widest"
              >
                Filter
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-grow min-h-[800px]">
          <div
            className={`grid gap-3 ${
              gridCols === 2
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {filteredProducts.map((product) => {
              const isWishlisted = isInWishlist(product._id);

              return (
                <div
                  key={product._id}
                  className="group border border-gray-100 px-3 py-4 flex flex-col hover:shadow-md transition"
                >
                  <Link href={`/products/${product._id}`}>
                    <div className="relative aspect-square overflow-hidden mb-4">
                      <img
                        src={product.imageURLs?.[0] || "/placeholder.webp"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlist(product);
                        }}
                        className="absolute top-2 right-2 bg-white p-2 rounded-full shadow"
                      >
                        {isWishlisted ? (
                          <AiFillHeart className="text-red-500 text-xl" />
                        ) : (
                          <AiOutlineHeart className="text-gray-600 text-xl" />
                        )}
                      </button>
                    </div>

                    <h2 className="font-bold text-gray-800 mb-2 leading-tight">
                      {product.name}
                    </h2>
                  </Link>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[#159758] font-bold text-lg">
                      {product.salePrice} ৳
                    </span>
                    {product.productPrice > product.salePrice && (
                      <span className="text-gray-400 line-through text-sm">
                        {product.productPrice} ৳
                      </span>
                    )}
                  </div>

                  <button
                    className="bg-[#159758] my-3 text-sm w-full text-white px-6 py-3 font-semibold"
                    onClick={() => addToCart(product, quantity)}
                  >
                    ADD TO CART
                  </button>

                  <button
                    className="bg-[#159758] text-sm w-full text-white px-6 py-3 font-semibold"
                    onClick={() => {
                      addToCart(product, quantity);
                      window.location.href = "/checkout";
                    }}
                  >
                    BUY NOW
                  </button>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
