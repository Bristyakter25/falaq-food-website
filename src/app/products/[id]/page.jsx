"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { IoLogoWhatsapp } from "react-icons/io5";
import { useCart } from "@/context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [quantity, setQuantity] = useState(1);
  const [thumbStart, setThumbStart] = useState(0);
  const [selectedAttributes, setSelectedAttributes] = useState(null);

  const maxVisibleThumbs = 3;

  useEffect(() => {
    fetch(`https://ecommerce-saas-server-wine.vercel.app/api/v1/product/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "store-id": "0000122",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const data = res?.data;
        const defaults = {};
        if (data?.attributes) {
          Object.entries(data.attributes).forEach(([key, values]) => {
            defaults[key] = values[0];
          });
        }
        setSelectedAttributes(defaults);
        setProduct(data);
      })
      .catch(console.error);
  }, [id]);

  if (!product) return <p className="text-center py-20">Loading product...</p>;

 
  const selectedVariant = product.variant?.find((v) =>
    Object.entries(v.attributes).every(
      ([key, value]) => selectedAttributes[key] === value
    )
  );

  const finalPrice =
    selectedVariant?.salePrice ?? selectedVariant?.productPrice ?? product.salePrice ?? product.productPrice;

  const images = product.imageURLs?.length ? product.imageURLs : ["/placeholder.png"];
  const hasDiscount = finalPrice < (selectedVariant?.productPrice ?? product.productPrice);

  const scrollUp = () => thumbStart > 0 && setThumbStart((p) => p - 1);
  const scrollDown = () =>
    thumbStart + maxVisibleThumbs < images.length &&
    setThumbStart((p) => p + 1);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setOrigin({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
    setZoom(2.2);
  };

  const handleMouseLeave = () => {
    setZoom(1);
    setOrigin({ x: 50, y: 50 });
  };

  const decreaseQty = () => quantity > 1 && setQuantity((p) => p - 1);
  const increaseQty = () =>
    quantity < (selectedVariant?.quantity ?? product.quantity) && setQuantity((p) => p + 1);

  const handleAddToCart = (redirect = false) => {
    addToCart(
      {
        ...product,
        selectedAttributes,
        price: finalPrice,
      },
      quantity,
      { silent: redirect }
    );

    if (redirect) router.push("/checkout");
  };

  return (
    <div>
      <div className="max-w-5xl mx-auto py-14 grid md:grid-cols-2 gap-10 items-start">
       
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
            {images
              .slice(thumbStart, thumbStart + maxVisibleThumbs)
              .map((img, idx) => {
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

       
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold text-gray-700">{product.name}</h1>

          <div className="flex items-center gap-2">
            {hasDiscount && (
              <span className="text-gray-400 line-through text-sm">
                {selectedVariant?.productPrice ?? product.productPrice} ৳
              </span>
            )}
            <span className="text-[#159758] font-semibold">{finalPrice} ৳</span>
          </div>

          <div
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

         
          {product.attributes &&
            Object.entries(product.attributes).map(([attrName, values]) => (
              <div key={attrName} className="flex items-center gap-4 py-3">
                <span className="font-semibold">{attrName}:</span>
                <div className="flex gap-3">
                  {values.map((value) => (
                    <button
                      key={value}
                      onClick={() =>
                        setSelectedAttributes((prev) => ({
                          ...(prev ?? {}),
                          [attrName]: value,
                        }))
                      }
                      className={`px-4 py-2 border rounded ${
                        selectedAttributes[attrName] === value
                          ? "border-[#159758] bg-[#159758] text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}

        
          <div className="flex w-[350px] items-center gap-4 pt-4">
            <div className="flex border rounded">
              <button onClick={decreaseQty} className="px-2 border-r-1">
                −
              </button>
              <span className="px-2 font-semibold">{quantity}</span>
              <button onClick={increaseQty} className="px-2 border-l-1">
                +
              </button>
            </div>

            <button
              className="bg-[#159758] text-[12px] w-[200px] text-white px-3 py-3 font-bold"
              onClick={() => handleAddToCart(false)}
            >
              ADD TO CART
            </button>

            <button
              className="bg-[#159758] text-[12px] w-[200px] text-white px-3 py-3 font-bold"
              onClick={() => handleAddToCart(true)}
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
            <div className="text-md text-gray-900">
              <span className="font-bold text-lg">Tags: </span>
              {product.tags?.join(", ")}
            </div>
          </div>
        </div>
        
      </div>
     <div className="tabs flex border-t-2 pt-5 border-t-gray-300 items-center justify-center tabs-border">
  <input
    type="radio"
    name="my_tabs_2"
    className="tab"
    aria-label="DESCRIPTION"
    defaultChecked
  />

 
  <div
    className="tab-content w-full max-w-5xl px-4 md:px-10 lg:px-24 py-10 bg-base-100 text-gray-700 leading-relaxed
             [&_ul]:list-disc [&_ul]:list-inside [&_ol]:list-decimal [&_ol]:list-inside [&_li]:mb-2
             [&_table]:border [&_table]:border-gray-300 [&_th]:border [&_th]:border-gray-300 [&_th]:px-3 [&_th]:py-2 [&_th]:bg-gray-100 [&_td]:border [&_td]:border-gray-300 [&_td]:px-3 [&_td]:py-2 [&_td]:align-top"
    dangerouslySetInnerHTML={{ __html: product.ingredient }}
  />

  <input
    type="radio"
    name="my_tabs_2"
    className="tab"
    aria-label="ADDITIONAL INFORMATION"
  />
  <div className="tab-content bg-base-100 p-10">
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-10">
      <span>ওজন সিলেক্ট করুন</span>
      <ul className="flex gap-x-4 list-disc list-inside">
        <li>1kg</li>
        <li>2kg</li>
        <li>3kg</li>
      </ul>
    </div>
  </div>

  <input type="radio" name="my_tabs_2" className="tab" aria-label="REVIEWS" />
  <div className="tab-content border-base-300 bg-base-100 p-10" />
</div>

    </div>
  );
}
