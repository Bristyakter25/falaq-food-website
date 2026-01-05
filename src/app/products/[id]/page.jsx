"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IoLogoWhatsapp } from "react-icons/io5";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [quantity, setQuantity] = useState(1);
  const [thumbStart, setThumbStart] = useState(0);
const maxVisibleThumbs = 3;


const scrollUp = () => {
  if (thumbStart > 0) setThumbStart(prev => prev - 1);
};


const scrollDown = () => {
  if (thumbStart + maxVisibleThumbs < images.length) setThumbStart(prev => prev + 1);
};


  const decreaseQty = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
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

  useEffect(() => {
    // Correct single-product fetch URL
    fetch(`https://server-homeshopbd-2-kohl.vercel.app/api/v1/product/${id}`)
      .then((res) => res.json())
      .then((result) => {
        // Adjust based on API response
        if (result?.data) setProduct(result.data);
        else setProduct(null);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return <p className="text-center py-20">Loading product...</p>;
  }

  // Use imageURLs or fallback
  const images = product.imageURLs && product.imageURLs.length > 0
    ? product.imageURLs
    : ["/placeholder.png"];

  const hasDiscount = product.salePrice && product.salePrice < product.productPrice;

  return (
    <div className="max-w-6xl mx-auto py-14 grid md:grid-cols-2 gap-10 items-start">

      {/* LEFT: Images */}
     <div className="flex gap-x-3 sticky top-24 self-start">

        <div className="flex flex-col gap-3 relative">
  {thumbStart > 0 && (
    <button
      onClick={scrollUp}
      className="absolute top-0 left-[50%] transform -translate-x-1/2 text-xl font-bold bg-gray-100 rounded p-1 z-10"
    >
      ▲
    </button>
  )}

  {images.slice(thumbStart, thumbStart + maxVisibleThumbs).map((img, index) => (
    <img
      key={thumbStart + index}
      src={img}
      onClick={() => setActiveImg(thumbStart + index)}
      className={`w-[170px] h-[132px] object-cover border cursor-pointer ${
        activeImg === thumbStart + index ? "border-[#159758]" : "border-gray-300"
      }`}
    />
  ))}

  {thumbStart + maxVisibleThumbs < images.length && (
    <button
      onClick={scrollDown}
      className="absolute bottom-0 left-[50%] transform -translate-x-1/2 text-xl font-bold bg-gray-100 rounded p-1 z-10"
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
        <p className="text-[14px] text-gray-900 font-bold">
          <span className="font-light"> Home / Honey /</span> {product.name}
        </p>
        <h1 className="text-3xl font-semibold text-gray-700">{product.name}</h1>

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

        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
  <div dangerouslySetInnerHTML={{ __html: product.description }} />
</div>


        <fieldset className="fieldset">
          <legend className="fieldset-legend">ওজন সিলেক্ট করুন : </legend>
          <select defaultValue="Pick a browser" className="select">
            <option disabled={true}>Choose an option</option>
            <option>1 KG</option>
            <option>2 KG</option>
            <option>3 KG</option>
          </select>
        </fieldset>

        <div className="flex gap-4 pt-4">
          <div className="flex items-center gap-2 pt-2">
            <div className="flex border-gray-300 items-center border rounded">
              <button
                onClick={decreaseQty}
                className="p-1 border border-gray-300 text-xl font-bold hover:bg-gray-100"
              >
                −
              </button>
              <span className="p-1 min-w-[24px] text-center font-semibold">
                {quantity}
              </span>
              <button
                onClick={increaseQty}
                className="p-1 border border-gray-300 text-xl font-bold hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <button className="bg-[#159758] text-white px-6 py-3 font-semibold">
            ADD TO CART
          </button>
          <button className="border bg-[#159758] text-white border-[#159758] px-6 py-3 font-semibold">
            BUY NOW
          </button>
        </div>

        <div className="flex gap-4 pt-4">
          <button className="bg-[#159758] text-md text-white px-8 py-3 font-semibold border rounded-lg">
            কল করুনঃ +8809613821489
          </button>
          <button className="bg-[#21d442] flex text-md text-white px-8 py-3 font-semibold border rounded-lg">
            <span className="text-xl mt-1 mr-2">
              <IoLogoWhatsapp />
            </span>
            Whatsapp Us
          </button>
        </div>

        <div className="border-t mt-5 py-5 border-gray-300">
          <p className="text-gray-800 font-bold">
            SKU: <span className="text-gray-500 font-normal">{product.sku || "N/A"}</span>
          </p>
          <p className="text-gray-800 font-bold">
            Category:{" "}
            <span className="text-gray-500 font-normal">
              {product.category || "Organic Food"}
            </span>
          </p>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-600">
        <div>
          <h2>DESCRIPTION</h2>
          <p></p>
        </div>
      </div>
    </div>
  );
}
