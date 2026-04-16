import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart.js';
import { toast } from 'sonner';

const WishlistItemCard = ({ product, onRemove }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast.success('Added to cart');
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
      <Link to={`/products/${product.id}`}>
        <div className="relative overflow-hidden aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      </Link>
      <CardContent className="flex-1 p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-accent text-accent" />
          <span className="text-sm font-medium">{product.rating}</span>
        </div>
        <p className="text-2xl font-bold font-heading">
          ${product.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2 mt-auto">
        <Button
          onClick={handleAddToCart}
          className="flex-1 transition-all duration-200 active:scale-95"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to cart
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onRemove(product.id)}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WishlistItemCard;