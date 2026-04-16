import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, ArrowLeft, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ReviewCard from '@/components/ReviewCard.jsx';
import { useProducts } from '@/hooks/useProducts.js';
import { useCart } from '@/hooks/useCart.js';
import { useWishlist } from '@/hooks/useWishlist.js';
import { toast } from 'sonner';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = getProductById(id);
  const stock = product != null && product.stock != null ? Number(product.stock) : 99;
  const outOfStock = stock <= 0;

  useEffect(() => {
    if (!product) return;
    setQuantity((q) => Math.min(Math.max(1, q), Math.max(1, stock)));
  }, [product, stock]);

  if (!product) {
    return (
      <>
        <Helmet>
          <title>Product not found - Nadeel</title>
        </Helmet>
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">
                Product not found
              </h1>
              <Link to="/products">
                <Button>Back to products</Button>
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const images = [product.image, product.image, product.image];

  const handleAddToCart = async () => {
    if (outOfStock) return;
    try {
      await addToCart(product, quantity);
      toast.success(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart`);
    } catch (err) {
      toast.error(err.message || 'Failed to add to cart');
    }
  };

  const handleToggleWishlist = () => {
    const added = toggleWishlist(product);
    toast.success(added ? 'Added to wishlist' : 'Removed from wishlist');
  };

  return (
    <>
      <Helmet>
        <title>{`${product.name} - Nadeel`}</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <div className="luxury-container py-12 flex-1">
          <Link to="/products" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4 rounded-2xl overflow-hidden luxury-shadow-lg">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-lg overflow-hidden transition-all ${
                      selectedImage === index
                        ? 'ring-2 ring-primary'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full aspect-square object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4">{product.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-accent text-accent'
                          : 'text-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium">{product.rating}</span>
                <span className="text-muted-foreground">
                  ({product.reviews.length} reviews)
                </span>
              </div>
              <p className="text-4xl font-bold mb-2 font-heading">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                {outOfStock ? (
                  <span className="text-destructive font-medium">Out of stock</span>
                ) : (
                  <span>{stock} in stock</span>
                )}
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1 || outOfStock}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-16 text-center font-medium text-lg">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                    disabled={outOfStock || quantity >= stock}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  disabled={outOfStock}
                  className="flex-1 transition-all duration-200 active:scale-95"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {outOfStock ? 'Out of stock' : 'Add to cart'}
                </Button>
                <Button
                  onClick={handleToggleWishlist}
                  variant="outline"
                  size="lg"
                  className="transition-all duration-200 active:scale-95"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      inWishlist ? 'fill-rose-gold text-rose-gold' : ''
                    }`}
                  />
                </Button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8">
              Customer reviews
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))}
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ProductDetailsPage;