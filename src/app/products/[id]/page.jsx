"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IoLogoWhatsapp } from "react-icons/io5";
import { useCart } from "@/context/CartContext";




export default function ProductDetails() {
  const { id } = useParams(); // this is the _id of the product
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [quantity, setQuantity] = useState(1);
  const [thumbStart, setThumbStart] = useState(0);
  const maxVisibleThumbs = 3;

const { addToCart } = useCart();
  // Fetch product by _id
  useEffect(() => {
    fetch(`https://ecommerce-saas-server-wine.vercel.app/api/v1/product/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "store-id": "0000122",
      },
    })
      .then((res) => res.json())
      .then((res) => setProduct(res?.data))
      .catch(console.error);
  }, [id]);

  if (!product) {
    return <p className="text-center py-20">Loading product...</p>;
  }

  const images = product.imageURLs?.length ? product.imageURLs : ["/placeholder.png"];
  const hasDiscount = product.salePrice && product.salePrice < product.productPrice;

  const scrollUp = () => {
    if (thumbStart > 0) setThumbStart((p) => p - 1);
  };

  const scrollDown = () => {
    if (thumbStart + maxVisibleThumbs < images.length) setThumbStart((p) => p + 1);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x, y });
    setZoom(2.2);
  };

  const handleMouseLeave = () => {
    setZoom(1);
    setOrigin({ x: 50, y: 50 });
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity((p) => p - 1);
  };

  const increaseQty = () => {
    if (quantity < product.quantity) setQuantity((p) => p + 1);
  };

  return (
    <div className="max-w-5xl mx-auto py-14 grid md:grid-cols-2 gap-10 items-start">

      {/* LEFT: Images */}
      <div className="flex gap-x-3 sticky top-24 self-start">
        <div className="flex flex-col gap-3 relative">
          {thumbStart > 0 && (
            <button
              onClick={scrollUp}
              className="absolute top-0 left-1/2 -translate-x-1/2 bg-gray-100 p-1 z-10"
            >
              ▲
            </button>
          )}

          {images.slice(thumbStart, thumbStart + maxVisibleThumbs).map((img, idx) => {
            const realIndex = thumbStart + idx;
            return (
              <img
                key={realIndex}
                src={img}
                onClick={() => setActiveImg(realIndex)}
                className={`w-[170px] h-[132px] object-cover border cursor-pointer ${
                  activeImg === realIndex ? "border-[#159758]" : "border-gray-300"
                }`}
              />
            );
          })}

          {thumbStart + maxVisibleThumbs < images.length && (
            <button
              onClick={scrollDown}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-gray-100 p-1 z-10"
            >
              ▼
            </button>
          )}
        </div>

        <div
          className="relative w-full h-[420px] overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={images[activeImg]}
            className="w-full h-full object-contain transition-transform duration-200"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: `${origin.x}% ${origin.y}%`,
            }}
          />
        </div>
      </div>

      {/* RIGHT: Info */}
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold text-gray-700">{product.name}</h1>

        <div className="flex items-center gap-2">
          {hasDiscount && (
            <span className="text-gray-400 line-through text-sm">{product.productPrice} ৳</span>
          )}
          <span className="text-[#159758] font-semibold">
            {hasDiscount ? product.salePrice : product.productPrice} ৳
          </span>
        </div>

        <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: product.description }} />

        <div className="flex w-[350px] items-center gap-4 pt-4">
          <div className="flex border rounded">
            <button onClick={decreaseQty} className="px-2 border-r-1">−</button>
            <span className="px-2 font-semibold">{quantity}</span>
            <button onClick={increaseQty} className="px-2 border-l-1">+</button>
          </div>

          <button
  className="bg-[#159758] text-[12px] w-[200px] text-white px-3 py-3 font-bold"
  onClick={() => addToCart(product, quantity)}
>
  ADD TO CART
</button>


         <button
  className="bg-[#159758] text-[12px] w-[200px] text-white px-3 py-3 font-bold"
  onClick={() => {
    addToCart(product, quantity);
    window.location.href = "/checkout";
  }}
>
  BUY NOW
</button>

        </div>

        <div className="flex gap-4 pt-4">
          <button className="bg-[#159758] text-white px-8 py-3 font-semibold rounded-lg">
            কল করুনঃ +8809613821489
          </button>

          <button className="bg-[#21d442] flex items-center text-white px-8 py-3 font-semibold rounded-lg">
            <IoLogoWhatsapp className="text-xl mr-2" /> Whatsapp Us
          </button>
        </div>

        <div className="border-t mt-5 pt-5">
          <p className="font-bold">
            SKU: <span className="font-normal">{product.sku || "N/A"}</span>
          </p>
          <p className="font-bold">
            Category:{" "}
            <span className="font-normal">
              {product.category?.length ? product.category.join(", ") : "Organic Food"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
