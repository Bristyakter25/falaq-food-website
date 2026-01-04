import { useState } from 'react'

export default function ProductCard({ product }) {
  const [imgIndex, setImgIndex] = useState(0)

  const handleHover = () => {
    setImgIndex(prev =>
      prev === product.images.length - 1 ? 0 : prev + 1
    )
  }

  const handleLeave = () => {
    setImgIndex(1) 
  }

  return (
    <div
      className="border p-4 border-gray-300  overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <div className="h-56 overflow-hidden">
        <img
          src={product.images[imgIndex]}
          alt={product.name}
          className="w-full h-full object-cover transition duration-300"
        />
      </div>

      <div className="py-3 space-y-2">
        <h3 className="font-bold text-gray-800 text-[14px]">{product.name}</h3>
        <p className="text-[#159758] font-semibold">{product.price}</p>
        <button className="w-full font-semibold bg-[#159758] text-white py-2  hover:bg-green-700 transition">
         ADD TO CART
        </button>
        <button className="w-full font-semibold bg-[#159758] text-white py-2  hover:bg-green-700 transition">
        BUY NOW
        </button>
      </div>
    </div>
  )
}
