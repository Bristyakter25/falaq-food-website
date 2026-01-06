"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // For app directory
import Image from "next/image";

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id;

  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://server-homeshopbd-2-kohl.vercel.app/api/v1/category/${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        setCategory(data?.data || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [categoryId]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!category) return <p className="text-center py-10">Category not found</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
    
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{category.parentCategory}</h1>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {category.imageURLs2?.length > 0 ? (
          category.imageURLs2.map((img, index) => (
            <div key={index} className="border rounded p-2 flex flex-col items-center">
              <Image
                src={img}
                alt={category.parentCategory}
                width={200}
                height={200}
                className="object-contain"
              />
              <p className="mt-2 font-medium">{category.parentCategory}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No images available</p>
        )}
      </div>

      {/* Child Categories */}
      {category.childCategory?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Sub Categories</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {category.childCategory.map((child, index) => (
              <li
                key={index}
                className="border p-3 rounded text-center hover:bg-[#159758] hover:text-white cursor-pointer transition"
              >
                {child}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
