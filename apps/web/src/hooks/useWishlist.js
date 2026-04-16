import { useState, useEffect } from 'react';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('nadeel_wishlist');
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist));
      } catch (error) {
        setWishlist([]);
      }
    }
  }, []);

  const saveWishlist = (newWishlist) => {
    setWishlist(newWishlist);
    localStorage.setItem('nadeel_wishlist', JSON.stringify(newWishlist));
  };

  const addToWishlist = (product) => {
    if (!wishlist.find(item => item.id === product.id)) {
      saveWishlist([...wishlist, product]);
      return true;
    }
    return false;
  };

  const removeFromWishlist = (productId) => {
    saveWishlist(wishlist.filter(item => item.id !== productId));
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.find(item => item.id === product.id);
    if (exists) {
      removeFromWishlist(product.id);
      return false;
    } else {
      addToWishlist(product);
      return true;
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist
  };
};