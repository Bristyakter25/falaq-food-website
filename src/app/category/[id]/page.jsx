import React from "react";
import CategoryClient from "./CategoryClient";

export default async function CategoryPage({ params }) {
  const { id } = await params;
  const categoryName = decodeURIComponent(id);

  const res = await fetch(
    `https://ecommerce-saas-server-wine.vercel.app/api/v1/product/website?category=${categoryName}`,
    {
      next: { revalidate: 10, tags: ["product"] },
      headers: {
        "Content-Type": "application/json",
        "store-id": `0000122`,
      },
    }
  );

  const result = await res.json();
  const initialProducts = result?.data?.data || [];

  return (
    <CategoryClient 
      initialProducts={initialProducts} 
      categoryName={categoryName} 
    />
  );
}