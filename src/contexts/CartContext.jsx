import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, user } = useAuth();

  // Fetch cart when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCart([]);
      setCartCount(0);
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      // 1. Fetch the raw cart items
      const cartData = await api.getCart(user?.user_id);
      console.log("🧺 Raw Cart Data:", cartData);
      
      const rawItems = Array.isArray(cartData) ? cartData : (cartData.items || []);

      // 2. Fetch products to "enrich" the cart with names, prices, and images
      const allProducts = await api.getProducts();
      
      const enrichedItems = rawItems.map(item => {
        // Find the corresponding product details
        const details = allProducts.find(p => p.id === item.product_id || p.id === parseInt(item.product_id));
        
        if (details) {
          return {
            ...item,
            name: details.title || details.name || 'Unknown Product',
            price: details.price || 0,
            imageUrl: details.image || details.imageUrl || '',
            category: details.category || ''
          };
        }
        return item; // Fallback to raw item if product not found
      });

      console.log("✨ Enriched Cart Items:", enrichedItems);
      setCart(enrichedItems);
      setCartCount(enrichedItems.length);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    try {
      await api.addToCart({
        product_id: product.id,
        quantity: product.quantity || 1,
        user_id: user?.user_id,
      });
      await fetchCart();
      return true;
    } catch (error) {
      console.error('Failed to add to cart:', error);
      throw error;
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await api.removeFromCart(itemId);
      await fetchCart();
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await api.clearCart();
      setCart([]);
      setCartCount(0);
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw error;
    }
  };

  const value = {
    cart,
    cartCount,
    loading,
    addToCart,
    removeFromCart,
    clearCart,
    refreshCart: fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
