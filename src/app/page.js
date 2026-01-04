
"use client";
import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import Navbar from "./components/home/Navbar";
import FeaturedProducts from "./components/FeaturedProducts";

export default function Page() {
const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  
  return (
    <div>
     <Navbar></Navbar>
     <Banner></Banner>
     <FeaturedProducts products={products} />
    </div>
  );
}
