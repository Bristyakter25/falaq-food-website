"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1️⃣ Load wishlist from localStorage (ONCE)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("wishlist");
      if (stored) {
        setWishlist(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Wishlist parse error:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 2️⃣ Persist wishlist AFTER initial load
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist, isLoaded]);

  // 3️⃣ Toggle wishlist item (SAFE)
  const toggleWishlist = useCallback((product) => {
    if (!product?._id) return;

    setWishlist((prev) => {
      const exists = prev.some((item) => item._id === product._id);
      return exists
        ? prev.filter((item) => item._id !== product._id)
        : [...prev, product];
    });
  }, []);

  // 4️⃣ Remove item
  const removeFromWishlist = useCallback((productId) => {
    setWishlist((prev) => prev.filter((item) => item._id !== productId));
  }, []);

  // 5️⃣ Check existence
  const isInWishlist = useCallback(
    (productId) => wishlist.some((item) => item._id === productId),
    [wishlist]
  );

  // 6️⃣ Memoized context value (IMPORTANT)
  const value = useMemo(
    () => ({
      wishlist,
      isLoaded,
      toggleWishlist,
      removeFromWishlist,
      isInWishlist,
    }),
    [wishlist, isLoaded, toggleWishlist, removeFromWishlist, isInWishlist]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

// 7️⃣ Custom hook
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }
  return context;
};
