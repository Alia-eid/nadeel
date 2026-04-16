import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import WishlistItemCard from '@/components/WishlistItemCard.jsx';
import { useWishlist } from '@/hooks/useWishlist.js';
import { toast } from 'sonner';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  const handleRemove = (productId) => {
    removeFromWishlist(productId);
    toast.success('Removed from wishlist');
  };

  return (
    <>
      <Helmet>
        <title>Wishlist - Nadeel</title>
        <meta name="description" content="View your saved luxury fragrances and add them to your cart." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <div className="luxury-container py-12 flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8">
              My wishlist
            </h1>

            {wishlist.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlist.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <WishlistItemCard product={product} onRemove={handleRemove} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-12 h-12 text-muted-foreground" />
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  Your wishlist is empty
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Save your favorite fragrances for later
                </p>
                <Link to="/products">
                  <Button size="lg" className="transition-all duration-200 active:scale-95">
                    Browse products
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default WishlistPage;