"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  if (!products.length) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="my-16">
      <h2 className="text-center text-3xl font-semibold text-[#159758]">
        FEATURED PRODUCTS
      </h2>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 my-12 mx-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <button className="block mx-auto font-semibold bg-[#159758] text-white py-2 px-6">
  VIEW MORE
</button>

    </div>
  );
}
