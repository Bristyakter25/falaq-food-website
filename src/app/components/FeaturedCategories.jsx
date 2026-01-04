import React from "react";
import Image from "next/image";

export default function FeaturedCategories() {
  const categories = [
    {
      id: 1,
      image: "/category 1.webp",
      title: "Organic",
    },
    {
      id: 2,
      image: "/category 2.webp",
      title: "Honey",
    },
    {
      id: 3,
      image: "/category 3.webp",
      title: "All Products",
    },
  ];

  return (
    <div className="mx-4 my-10">
       <h2 className='text-[#159758] text-center text-3xl font-medium mt-24 mb-8'>FEATURED CATEGORIES</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white overflow-hidden group"
          >
            {/* Image wrapper with zoom */}
            <div className="overflow-hidden">
              <Image
                src={cat.image}
                alt={cat.title}
                width={500}
                height={500}
                className="w-full  transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Text below image */}
            <div className="p-4 text-center">
              <h3 className="text-xl font-bold text-gray-800">
                {cat.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
