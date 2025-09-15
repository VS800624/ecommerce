import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";

const CartContext = createContext();

// Debounce utility outside component
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartSize, setCartSize] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(0); // Control fetching

  const fetchCart = useCallback(
    debounce(async () => {
      if (isFetching) {
        return;
      }
      const token = localStorage.getItem("token");
      if (!token || !token.includes('.')) {
        setCart([]);
        setCartSize(0);
        return;
      }
      setIsFetching(true);
      try {
        const response = await axios.get("https://e-commerce-h39e.onrender.com/api/cart", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const cartData = Array.isArray(response.data) ? response.data : [];
        setCart(cartData);
        setCartSize(cartData.reduce((total, item) => total + (item.amount || 1), 0));
      } catch (err) {
        setCart([]);
        setCartSize(0);
      } finally {
        setIsFetching(false);
      }
    }, 1000),
    []
  );

  useEffect(() => {
    fetchCart();
  }, [fetchTrigger, fetchCart]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'token') {
        if (!localStorage.getItem('token') || !localStorage.getItem('token').includes('.')) {
          setCart([]);
          setCartSize(0);
        } else {
          triggerFetch();
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [fetchTrigger]);

  const triggerFetch = useCallback(() => {
    setFetchTrigger(prev => prev + 1);
  }, []);

  const addToCart = async (item, navigate, location) => {
    const token = localStorage.getItem("token");
    if (!token || !token.includes('.')) {
      if (navigate && location) {
        navigate("/Login", { state: { from: location.pathname } });
      }
      return;
    }
    try {
      const existingItem = cart.find((product) => product.productId === item.id);
      const amount = existingItem ? (existingItem.amount || 1) + 1 : 1;
      const cartItem = {
        productId: item.id,
        productName: item.productName || item.title,
        img: item.img,
        price: Number(String(item.price || "").replace(/[^0-9.-]+/g, "")) || 0,
        discountPrice: Number(String(item.discountPrice || "").replace(/[^0-9.-]+/g, "")) || undefined,
        amount
      };
      const response = await axios.post(
        "https://e-commerce-h39e.onrender.com/api/cart",
        cartItem,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedCart = Array.isArray(response.data) ? response.data : [];
      setCart(updatedCart);
      setCartSize(updatedCart.reduce((total, item) => total + (item.amount || 1), 0));
      triggerFetch();
    } catch (err) {
    }
  };

  const handleChange = async (item, delta) => {
    const token = localStorage.getItem("token");
    if (!token || !token.includes('.')) {
      return;
    }
    try {
      const newAmount = Math.max(1, (item.amount || 1) + delta);
      const cartItem = {
        productId: item.productId,
        productName: item.productName,
        img: item.img,
        price: item.price,
        discountPrice: item.discountPrice,
        amount: newAmount
      };
      const response = await axios.post(
        "https://e-commerce-h39e.onrender.com/api/cart",
        cartItem,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedCart = Array.isArray(response.data) ? response.data : [];
      setCart(updatedCart);
      setCartSize(updatedCart.reduce((total, item) => total + (item.amount || 1), 0));
      triggerFetch();
    } catch (err) {
    }
  };

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token || !token.includes('.')) {
      return;
    }
    try {
      const response = await axios.post(
        "https://e-commerce-h39e.onrender.com/api/cart",
        { productId, amount: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedCart = Array.isArray(response.data) ? response.data : [];
      setCart(updatedCart);
      setCartSize(updatedCart.reduce((total, item) => total + (item.amount || 1), 0));
      triggerFetch();
    } catch (err) {
    }
  };

  const clearCart = async () => {
    const token = localStorage.getItem("token");
    if (!token || !token.includes('.')) {
      setCart([]);
      setCartSize(0);
      return;
    }
    try {
      await axios.delete("https://e-commerce-h39e.onrender.com/api/cart", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart([]);
      setCartSize(0);
      triggerFetch();
    } catch (err) {
    }
  };

  // Memoize context value to prevent re-renders
  const contextValue = useMemo(
    () => ({
      cart,
      setCart,
      addToCart,
      handleChange,
      removeFromCart,
      cartSize,
      clearCart,
      fetchCart,
      triggerFetch
    }),
    [cart, cartSize, addToCart, handleChange, removeFromCart, clearCart, fetchCart, triggerFetch]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};