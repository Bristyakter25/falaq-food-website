"use client";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "../components/ProductCard";


export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-center text-3xl font-bold mb-10 text-[#159758]">MY WISHLIST</h1>
      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
          {wishlist.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}