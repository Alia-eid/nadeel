import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart.js';
import { useWishlist } from '@/hooks/useWishlist.js';
import { toast } from 'sonner';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const stock = product.stock != null ? Number(product.stock) : 99;
  const outOfStock = stock <= 0;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (outOfStock) return;
    try {
      await addToCart(product, 1);
      toast.success('Added to cart');
    } catch (err) {
      toast.error(err.message || 'Failed to add to cart');
    }
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    const added = toggleWishlist(product);
    toast.success(added ? 'Added to wishlist' : 'Removed from wishlist');
  };

  return (
    <Link to={`/products/${product.id}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
        <div className="relative overflow-hidden aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <button
            onClick={handleToggleWishlist}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full transition-all duration-200 hover:bg-white hover:scale-110 active:scale-95"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                inWishlist ? 'fill-rose-gold text-rose-gold' : 'text-charcoal'
              }`}
            />
          </button>
          <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
            <Badge className="bg-primary text-primary-foreground">{product.category}</Badge>
            {outOfStock && (
              <Badge variant="destructive" className="text-xs">
                Out of stock
              </Badge>
            )}
          </div>
        </div>
        <CardContent className="flex-1 p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({product.reviews.length})
            </span>
          </div>
          <p className="text-2xl font-bold font-heading">
            ${product.price.toFixed(2)}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto">
          <Button
            onClick={handleAddToCart}
            disabled={outOfStock}
            className="w-full transition-all duration-200 active:scale-95"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {outOfStock ? 'Out of stock' : 'Add to cart'}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;