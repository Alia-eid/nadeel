import { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api.js';

const mapLineFromApi = (item) => ({
  id: item.id,
  quantity: item.quantity,
  product: {
    id: item.product.id,
    name: item.product.name,
    description: item.product.description,
    image: item.product.imageUrl || '',
    category: 'Perfume',
    price: Number(item.product.price),
    stock: item.product.stock != null ? Number(item.product.stock) : 0,
    rating: 0,
    reviews: [],
  },
});

export const useCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const token = localStorage.getItem('nadeel_token');
      if (!token) {
        const storedCart = localStorage.getItem('nadeel_cart');
        if (storedCart) {
          try {
            setCart(JSON.parse(storedCart));
          } catch {
            setCart([]);
          }
        }
        return;
      }

      try {
        const apiCart = await apiRequest('/cart');
        setCart(apiCart.map(mapLineFromApi));
      } catch {
        setCart([]);
      }
    };

    loadCart();
  }, []);

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('nadeel_cart', JSON.stringify(newCart));
  };

  const addToCart = async (product, quantity = 1) => {
    const token = localStorage.getItem('nadeel_token');
    if (token) {
      try {
        await apiRequest('/cart', {
          method: 'POST',
          body: JSON.stringify({ productId: product.id, quantity }),
        });
        const refreshed = await apiRequest('/cart');
        setCart(refreshed.map(mapLineFromApi));
        return;
      } catch {
        // Fall through to local cart behavior.
      }
    }

    const maxStock = product.stock != null ? Number(product.stock) : 999;
    if (maxStock <= 0) {
      throw new Error('Out of stock');
    }

    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      const nextQty = existingItem.quantity + quantity;
      if (nextQty > maxStock) {
        throw new Error(`Only ${maxStock} available in stock`);
      }
      const newCart = cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: nextQty }
          : item
      );
      saveCart(newCart);
    } else {
      if (quantity > maxStock) {
        throw new Error(`Only ${maxStock} available in stock`);
      }
      saveCart([...cart, { product, quantity }]);
    }
  };

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem('nadeel_token');
    if (token) {
      const item = cart.find((entry) => entry.product.id === productId);
      if (item?.id) {
        try {
          await apiRequest(`/cart/${item.id}`, { method: 'DELETE' });
          setCart((prev) => prev.filter((entry) => entry.product.id !== productId));
          return;
        } catch {
          // Fall back to local update.
        }
      }
    }

    saveCart(cart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      const token = localStorage.getItem('nadeel_token');
      if (token) {
        const item = cart.find((entry) => entry.product.id === productId);
        if (item?.id) {
          try {
            const updated = await apiRequest(`/cart/${item.id}`, {
              method: 'PUT',
              body: JSON.stringify({ quantity }),
            });
            setCart((prev) =>
              prev.map((entry) =>
                entry.id === updated.id ? mapLineFromApi(updated) : entry
              )
            );
            return;
          } catch {
            // Fall back to local update.
          }
        }
      }

      const line = cart.find((i) => i.product.id === productId);
      const maxStock = line?.product?.stock != null ? Number(line.product.stock) : 999;
      if (quantity > maxStock) {
        throw new Error(`Only ${maxStock} available in stock`);
      }
      const newCart = cart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      saveCart(newCart);
    }
  };

  const clearCart = () => {
    saveCart([]);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount
  };
};