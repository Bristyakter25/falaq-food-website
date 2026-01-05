"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://server-homeshopbd-2-kohl.vercel.app/api/v1/product?page=1&limit=10")
      .then((res) => res.json())
      .then((result) => {
        if (result?.data?.products) {
          setProducts(result.data.products);
        } else {
          setProducts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!products.length) return <p className="text-center py-10">No products found.</p>;

  return (
    <div className="mt-16 mb-6">
      <h2 className="text-center text-3xl font-semibold text-[#159758]">
        FEATURED PRODUCTS
      </h2>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mt-12 mb-7 mx-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <button className="block mx-auto font-semibold bg-[#159758] text-white py-2 px-6">
        VIEW MORE
      </button>
    </div>
  );
}
