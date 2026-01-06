"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { BsGrid3X3GapFill, BsGridFill } from "react-icons/bs";

export default function CategoryClient({ initialProducts, categoryName }) {
  const [sortBy, setSortBy] = useState("latest");
  const [gridCols, setGridCols] = useState(3);

 
  const [tempMinPrice, setTempMinPrice] = useState(0);
  const [tempMaxPrice, setTempMaxPrice] = useState(4000);

  
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(4000);

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

  return (
    <div className="bg-white min-h-screen">
     
      <div className="flex items-center justify-center gap-4 py-10 border-b border-gray-100">
        <Link href="/" className="text-3xl text-gray-400 hover:text-black">←</Link>
        <h1 className="text-5xl font-normal text-gray-800 tracking-tight">
          {categoryName}
        </h1>
      </div>

      <div className="lg:w-[1024px] w-[380px] mx-auto  py-8 flex flex-col lg:flex-row gap-5">
        
    
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-10">
            <h3 className="font-bold text-sm uppercase tracking-wider mb-6 pb-2 border-b-2 border-gray-100">
              Filter by Price
            </h3>

           
            <div className="relative h-6 flex items-center mb-4">
              <div className="absolute w-full h-1 bg-gray-200 rounded-full"></div>
              <div
                className="absolute h-1 bg-[#159758] rounded-full"
                style={{
                  left: `${(tempMinPrice / 4000) * 100}%`,
                  right: `${100 - (tempMaxPrice / 4000) * 100}%`,
                }}
              ></div>

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

           
            <div className="mt-10">
              <h3 className="font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b-2 border-gray-100">
                Stock Status
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 accent-[#159758]" />
                  On sale
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 accent-[#159758]" />
                  In stock
                </label>
              </div>
            </div>
          </div>
        </aside>

        
        <main className="flex-grow min-h-[800px]">
          <div className="flex flex-wrap justify-between items-center mb-8 pb-4 border-b border-gray-100 text-sm text-gray-500">
            <div className="flex items-center gap-2 font-medium">
              <Link href="/" className="hover:text-[#159758]">Home</Link> / {categoryName}
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-3 text-xl border-r pr-6 border-gray-200">
                <BsGridFill
                  className={`cursor-pointer ${gridCols === 2 ? "text-black" : "text-gray-300"}`}
                  onClick={() => setGridCols(2)}
                />
                <BsGrid3X3GapFill
                  className={`cursor-pointer ${gridCols === 3 ? "text-black" : "text-gray-300"}`}
                  onClick={() => setGridCols(3)}
                />
              </div>

              <p className="font-medium">
                Show: <span className="text-black font-bold">{filteredProducts.length}</span>
              </p>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-bold outline-none"
              >
                <option value="latest">Sort by latest</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

         
          <div className={`grid gap-5 ${
            gridCols === 2
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}>
           {filteredProducts.map((product) => (
  <div
    key={product._id}
    className="group border border-gray-100 px-3 py-4 flex flex-col hover:shadow-md transition"
  >
    
    <div className="relative aspect-square overflow-hidden mb-4">
      <img
        src={product.imageURLs?.[0] || "/placeholder.webp"}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
      />

     
      {product.productPrice > product.salePrice && (
        <span className="absolute top-3 left-3 bg-[#159758] text-white text-xs font-bold px-2 py-1">
          SALE
        </span>
      )}
    </div>

   
    <h2 className="font-bold text-gray-800 mb-2 leading-tight">
      {product.name}
    </h2>

    
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

   
     <button className="bg-[#159758] my-3 text-white px-6 py-3 font-semibold">
            ADD TO CART
          </button>

          <button className="bg-[#159758] text-white px-6 py-3 font-semibold">
            BUY NOW
          </button>
  </div>
))}

          </div>

          
          {filteredProducts.length === 0 && (
            <div className="text-center py-32">
              <p className="text-gray-400">No products found.</p>
              <button
                onClick={() => {
                  setTempMinPrice(0);
                  setTempMaxPrice(4000);
                  setMinPrice(0);
                  setMaxPrice(4000);
                }}
                className="mt-4 text-[#159758] underline font-bold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
