
"use client";
import { useEffect, useState } from "react";
import Banner from "./components/Banner";

import FeaturedProducts from "./components/FeaturedProducts";
import Blogs from "./components/Blogs";
import Reviews from "./components/Reviews";

export default function Page() {
const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  
  return (
    <div>
     
     <Banner></Banner>
     <FeaturedProducts products={products} />
     <Blogs></Blogs>
     <Reviews></Reviews>
    </div>
  );
}
