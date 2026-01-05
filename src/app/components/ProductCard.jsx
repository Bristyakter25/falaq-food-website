import Link from "next/link";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [imgIndex, setImgIndex] = useState(0);

  
  const images = product.imageURLs && product.imageURLs.length > 0
    ? product.imageURLs
    : ["/placeholder.png"]; // fallback image

  
  const hasDiscount = product.salePrice && product.salePrice < product.productPrice;

  return (
  <Link href={`/products/${product._id}`}>

      <div
        className="border p-4 border-gray-300 overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer relative"
        onMouseEnter={() =>
          setImgIndex(prev =>
            prev === images.length - 1 ? 0 : prev + 1
          )
        }
        onMouseLeave={() => setImgIndex(0)}
      >
        {/* Sale badge */}
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 font-semibold rounded">
            SALE {product.discount}%
          </span>
        )}

        {/* Image */}
        <div className="h-56 overflow-hidden">
          <img
            src={images[imgIndex]}
            alt={product.name}
            className="w-full h-full object-cover transition duration-300"
          />
        </div>

        {/* Product info */}
        <div className="py-3 space-y-2">
          <h3 className="font-bold text-gray-800 text-[14px] line-clamp-2">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            {hasDiscount && (
              <span className="text-gray-400 line-through text-sm">
                {product.productPrice} ৳
              </span>
            )}
            <span className="text-[#159758] font-semibold">
              {hasDiscount ? product.salePrice : product.productPrice} ৳
            </span>
          </div>

          {/* Buttons */}
          <button className="w-full font-semibold bg-[#159758] text-white py-2 hover:bg-green-700 transition">
            ADD TO CART
          </button>

          <button className="w-full font-semibold bg-[#159758] text-white py-2 hover:bg-green-700 transition">
            BUY NOW
          </button>
        </div>
      </div>
    </Link>
  );
}
