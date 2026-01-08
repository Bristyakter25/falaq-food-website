"use client";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const [imgIndex, setImgIndex] = useState(0);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  const isWishlisted = isInWishlist(product._id);
  const router = useRouter();

  const images = product.imageURLs?.length > 0 ? product.imageURLs : ["/placeholder.png"];
  const hasDiscount = product.salePrice && product.salePrice < product.productPrice;

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleBuyNow = () => {
  
    addToCart(product, quantity);
    
    router.push("/checkout");
  };

  return (
    <div className="border p-4 border-gray-300 overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer relative">
      <Link href={`/products/${product._id}`}>
        <div
          onMouseEnter={() => setImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
          onMouseLeave={() => setImgIndex(0)}
        >
          {hasDiscount && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 font-semibold rounded">
              SALE {product.discount}%
            </span>
          )}

          <button 
            onClick={handleWishlistClick}
            className="absolute top-2 left-3 z-10 p-2 bg-white rounded-full shadow-md transition-transform hover:scale-110"
          >
            {isWishlisted ? (
              <AiFillHeart className="text-2xl text-red-500" />
            ) : (
              <AiOutlineHeart className="text-2xl text-gray-600" />
            )}
          </button>

          <div className="h-56 overflow-hidden">
            <img src={images[imgIndex]} alt={product.name} className="w-full h-full object-cover transition duration-300" />
          </div>

          <div className="py-3 space-y-2">
            <h3 className="font-bold text-gray-800 text-[14px] line-clamp-2">{product.name}</h3>
            <div className="flex items-center gap-2">
              {hasDiscount && <span className="text-gray-400 line-through text-sm">{product.productPrice} ৳</span>}
              <span className="text-[#159758] font-semibold">
                {hasDiscount ? product.salePrice : product.productPrice} ৳
              </span>
            </div>
          </div>
        </div>
      </Link>
      
      <button 
        className="bg-[#159758] my-3 text-sm w-full text-white px-6 py-3 font-semibold"
        onClick={() => addToCart(product, quantity)}
      >
        ADD TO CART
      </button>

      <button 
        className="bg-[#159758] text-sm w-full text-white px-6 py-3 font-semibold"
        onClick={handleBuyNow}
      >
        BUY NOW
      </button>
    </div>
  );
}
