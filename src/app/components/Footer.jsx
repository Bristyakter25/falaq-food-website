import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaFacebookF,
  FaFacebookMessenger,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Left Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img
              src="/falaq logo.webp" // replace with your actual logo path
              alt="Falaq Food"
              className="h-[70px] w-[200px] "
            />
          </div>
          <p className="text-gray-800 text-lg leading-relaxed mb-4">
            Welcome to Falaq Food – where purity meets taste, and every
            bite tells a story of authenticity and care.
          </p>

          <div className="flex gap-5 mx-5">
            <a className="text-green-500 text-3xl">
              <FaWhatsapp />
            </a>
            <a className="text-blue-500 text-3xl">
              <FaFacebookMessenger />
            </a>
          </div>
        </div>

        {/* Middle Section */}
        <div className="space-y-6 ml-10 text-lg text-gray-700">
          <div className="flex gap-3 items-start">
            <FaEnvelope className="mt-1 text-gray-500" />
            <p>
              <span className="font-semibold">Email (For Corporate Sales):</span>
              <br />
              corporate@falaqfood.com
            </p>
          </div>

          <div className="flex gap-3 items-start">
            <FaPhoneAlt className="mt-1 text-gray-500" />
            <p>
              <span className="font-semibold">Our Phone Number:</span>
              <br />
              +8809613821489
              <br />
              +8801765890646 (Whatsapp Only)
            </p>
          </div>

          <div className="flex gap-3 items-start">
            <FaMapMarkerAlt className="mt-1 text-gray-500" />
            <p>
              <span className="font-semibold">Head Office:</span>
              <br />
              Bosila Future Town, Mohammadpur,
              <br />
              Dhaka-1207
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="ml-28 ">
          <h3 className="font-semibold text-xl text-center text-gray-700 mb-4">
            USEFUL LINKS
          </h3>
          <ul className="space-y-3 text-center text-[16px] text-gray-600">
            <li><a href="#">About us</a></li>
            <li><a href="#">Corporate Deal</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Return & Refund Policy</a></li>
            <li><a href="#">Career</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-600">
        Copyright © Falaq Food 2025 – All Rights Reserved |
        Trade License No.TRADE/DNCC/097112/2022
      </div>
    </footer>
  );
}
