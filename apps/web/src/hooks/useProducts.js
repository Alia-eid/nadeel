import { useState, useEffect, useMemo } from 'react';
import { mockProducts } from '@/data/mockProducts.js';
import { apiRequest } from '@/lib/api.js';

const mapApiProduct = (product) => ({
  id: product.id,
  name: product.name,
  description: product.description,
  image: product.imageUrl || '',
  category: 'Perfume',
  price: Number(product.price),
  stock: product.stock != null ? Number(product.stock) : 0,
  rating: 0,
  reviews: [],
});

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: 'All',
    priceRange: [0, 300],
    searchQuery: ''
  });
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    let mounted = true;
    const loadProducts = async () => {
      try {
        const apiProducts = await apiRequest('/products');
        if (!mounted) return;
        setProducts(apiProducts.map(mapApiProduct));
      } catch {
        // Fallback keeps storefront usable if API is unavailable.
        if (mounted) {
          setProducts(
            mockProducts.map((p) => ({
              ...p,
              stock: p.stock != null ? Number(p.stock) : 99,
            }))
          );
        }
      }
    };

    loadProducts();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (filters.category !== 'All') {
      result = result.filter(p => p.category === filters.category);
    }

    result = result.filter(p => 
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        result.sort((a, b) => String(b.id).localeCompare(String(a.id)));
        break;
    }

    return result;
  }, [products, filters, sortBy]);

  const getProductById = (id) => {
    return products.find((p) => String(p.id) === String(id));
  };

  const addProduct = async (product) => {
    const created = await apiRequest('/products', {
      method: 'POST',
      body: JSON.stringify({
        name: product.name,
        description: product.description,
        imageUrl: product.image,
        price: product.price,
        stock: product.stock || 0,
      }),
    });
    const mapped = mapApiProduct(created);
    setProducts((prev) => [mapped, ...prev]);
    return mapped;
  };

  const updateProduct = async (id, updates) => {
    const updated = await apiRequest(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: updates.name,
        description: updates.description,
        imageUrl: updates.image,
        price: updates.price,
        stock: updates.stock,
      }),
    });
    const mapped = mapApiProduct(updated);
    setProducts((prev) => prev.map((p) => (p.id === id ? mapped : p)));
  };

  const deleteProduct = async (id) => {
    await apiRequest(`/products/${id}`, { method: 'DELETE' });
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return {
    products: filteredAndSortedProducts,
    allProducts: products,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
  };
};