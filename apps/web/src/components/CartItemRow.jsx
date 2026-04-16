import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const CartItemRow = ({ item, updateQuantity, removeFromCart }) => {
  const { product, quantity } = item;
  const maxStock = product.stock != null ? Number(product.stock) : 999;

  const changeQty = async (next) => {
    try {
      await updateQuantity(product.id, next);
    } catch (err) {
      toast.error(err.message || 'Could not update quantity');
    }
  };

  return (
    <div className="flex gap-4 py-6 border-b border-border">
      <Link to={`/products/${product.id}`} className="flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-24 h-24 object-cover rounded-lg luxury-shadow"
        />
      </Link>
      <div className="flex-1 min-w-0">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
        <p className="text-xl font-bold font-heading">
          ${product.price.toFixed(2)}
        </p>
      </div>
      <div className="flex flex-col items-end justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeFromCart(product.id)}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => changeQty(quantity - 1)}
            disabled={quantity <= 1}
            className="h-8 w-8 p-0"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => changeQty(quantity + 1)}
            disabled={quantity >= maxStock}
            className="h-8 w-8 p-0"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItemRow;