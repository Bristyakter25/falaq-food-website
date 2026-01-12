"use client";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const [imgIndex, setImgIndex] = useState(0);
  const { addToCart, setIsDrawerOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const router = useRouter();

  const isWishlisted = isInWishlist(product._id);
  const images = product.imageURLs?.length > 0 ? product.imageURLs : ["/placeholder.png"];
  const hasDiscount = product.salePrice && product.salePrice < product.productPrice;

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const defaults = {};
    if (product.attributes) {
      Object.entries(product.attributes).forEach(([key, values]) => {
        defaults[key] = values[0];
      });
    }
    setSelectedAttributes(defaults);
    setQuantity(1);
    setActiveImg(0);
    setShowModal(true);
  };

 
  useEffect(() => {
  if (!product?.variant) return;

  // Compute the matching variant first
  const variant = product.variant.find((v) =>
    Object.entries(v.attributes).every(
      ([key, value]) => selectedAttributes[key] === value
    )
  );

  // Schedule state update asynchronously to avoid cascading render warning
  setTimeout(() => {
    setSelectedVariant(variant || null);
    if (variant?.image) setActiveImg(0);
  }, 0);
}, [selectedAttributes, product]);


  const finalPrice =
    selectedVariant?.salePrice ??
    selectedVariant?.productPrice ??
    product.salePrice ??
    product.productPrice;

  const variantImages =
    selectedVariant?.image
      ? [selectedVariant.image, ...(product.imageURLs || [])]
      : images;

  const handleAddToCart = (redirect = false) => {
    addToCart(
      {
        ...product,
        selectedAttributes,
        price: finalPrice,
        selectedImage: variantImages[activeImg],
      },
      quantity
    );

    setIsDrawerOpen(!redirect);

    if (redirect) {
      setShowModal(false);
      router.push("/checkout");
    } else {
      setShowModal(false);
    }
  };

  return (
    <div className="border py-4 px-3 border-gray-300 overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer relative">
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
            <img
              src={images[imgIndex]}
              alt={product.name}
              className="w-full h-full object-cover transition duration-300"
            />
          </div>

          <div className="py-3 space-y-2">
            <h3 className="font-bold text-gray-800 text-[14px] line-clamp-2">{product.name}</h3>
            <div className="flex items-center gap-2">
              {hasDiscount && (
                <span className="text-gray-400 line-through text-sm">
                  {product.productPrice.toLocaleString()} ৳
                </span>
              )}
              <span className="text-[#159758] font-semibold">
                {(hasDiscount ? product.salePrice : product.productPrice).toLocaleString()} ৳
              </span>
            </div>
          </div>
        </div>
      </Link>

      <button
        className="bg-[#159758] my-3 text-sm w-full text-white px-6 py-3 font-semibold hover:bg-green-700 transition"
        onClick={handleOpenModal}
      >
        ADD TO CART
      </button>

      <button
        className="bg-[#159758] text-sm w-full text-white px-6 py-3 font-semibold hover:bg-green-700 transition"
        onClick={handleOpenModal}
      >
        BUY NOW
      </button>

   
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-[400px] p-6 rounded-lg relative max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">{product.name}</h2>

            {/* Product Images */}
            <div className="flex gap-2 mb-4">
              {variantImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  className={`w-16 h-16 object-cover border cursor-pointer ${
                    activeImg === idx ? "border-[#159758]" : "border-gray-300"
                  }`}
                  onClick={() => setActiveImg(idx)}
                />
              ))}
            </div>

           
            <div className="mb-4 text-[#159758] font-bold text-lg">
              {finalPrice.toLocaleString()} ৳
            </div>

           
            {product.attributes &&
              Object.entries(product.attributes).map(([attrName, values]) => (
                <div key={attrName} className="flex items-center gap-2 mb-3">
                  <span className="font-semibold">{attrName}:</span>
                  <div className="flex gap-2 flex-wrap">
                    {values.map((value) => (
                      <button
                        key={value}
                        onClick={() =>
                          setSelectedAttributes((prev) => ({ ...prev, [attrName]: value }))
                        }
                        className={`px-3 py-1 border rounded ${
                          selectedAttributes[attrName] === value
                            ? "bg-[#159758] text-white border-[#159758]"
                            : "border-gray-300"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

           
            <div className="flex items-center gap-3 my-4">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 border"
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 border"
              >
                +
              </button>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col gap-2">
              <button
                className="bg-[#159758] text-white px-4 py-2 rounded"
                onClick={() => handleAddToCart(false)}
              >
                ADD TO CART
              </button>
              <button
                className="bg-[#159758] text-white px-4 py-2 rounded"
                onClick={() => handleAddToCart(true)}
              >
                BUY NOW
              </button>
              <button
                className="absolute top-2 right-2 text-gray-500"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
