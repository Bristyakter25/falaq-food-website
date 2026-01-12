"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Load cart once
  useEffect(() => {
    const savedCart = localStorage.getItem("user_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Cart parsing error:", error);
      }
    }
  }, []);

  // Single source of truth for cart persistence
  const saveAndSetCart = (items) => {
    setCartItems(items);
    localStorage.setItem("user_cart", JSON.stringify(items));
  };

  // Helper to compare variants safely
  const sameAttributes = (a = {}, b = {}) =>
    JSON.stringify(Object.entries(a).sort()) ===
    JSON.stringify(Object.entries(b).sort());

  const addToCart = (product, quantity = 1, options = { silent: false }) => {
    const existing = cartItems.find(
      (item) =>
        item.productId === product._id &&
        sameAttributes(item.selectedAttributes, product.selectedAttributes)
    );

    let updatedCart;

    if (existing) {
      updatedCart = cartItems.map((item) =>
        item === existing
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [
        ...cartItems,
        {
          productId: product._id, // ✅ REAL PRODUCT ID
          name: product.name,
          price: product.salePrice ?? product.price ?? 0,
          originalProductPrice: product.price ?? 0,
          image: product.image,
          selectedImage: product.selectedImage || product.image,
          category: product.category,
          variantId: product.variantId || null,
          selectedAttributes: product.selectedAttributes || {},
          quantity,
        },
      ];
    }

    saveAndSetCart(updatedCart);
    if (!options.silent) setIsDrawerOpen(true);
  };

  const updateQuantity = (productId, newQuantity, attrs = {}) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map((item) =>
      item.productId === productId && sameAttributes(item.selectedAttributes, attrs)
        ? { ...item, quantity: newQuantity }
        : item
    );

    saveAndSetCart(updatedCart);
  };

  const removeFromCart = (productId, attrs = {}) => {
    const updatedCart = cartItems.filter(
      (item) =>
        !(item.productId === productId &&
          sameAttributes(item.selectedAttributes, attrs))
    );

    saveAndSetCart(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("user_cart");
  };

  // Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const originalSubtotal = cartItems.reduce(
    (sum, item) =>
      sum + item.originalProductPrice * item.quantity,
    0
  );

  const totalCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        originalSubtotal,
        totalCount,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
