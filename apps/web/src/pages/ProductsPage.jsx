import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ProductCard from '@/components/ProductCard.jsx';
import FilterBar from '@/components/FilterBar.jsx';
import SortDropdown from '@/components/SortDropdown.jsx';
import { useProducts } from '@/hooks/useProducts.js';

const ProductsPage = () => {
  const { products, filters, setFilters, sortBy, setSortBy } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilters({ ...filters, searchQuery: query });
  };

  return (
    <>
      <Helmet>
        <title>Products - Nadeel</title>
        <meta name="description" content="Browse Nadeel's complete collection of luxury Arabian perfumes, musks, and body splashes. Find your signature scent today." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <div className="luxury-container py-12 flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our collection
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover luxury fragrances crafted for every occasion
            </p>

            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search fragrances..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-10 text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <aside className="lg:col-span-1">
                <div className="sticky top-24">
                  <FilterBar filters={filters} setFilters={setFilters} />
                </div>
              </aside>

              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-muted-foreground">
                    {products.length} {products.length === 1 ? 'product' : 'products'} found
                  </p>
                  <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
                </div>

                {products.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">No products found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your filters or search query
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ProductsPage;