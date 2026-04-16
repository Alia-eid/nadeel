import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import CartItemRow from '@/components/CartItemRow.jsx';
import { useCart } from '@/hooks/useCart.js';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, getTotal } = useCart();

  const subtotal = getTotal();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <>
      <Helmet>
        <title>Shopping cart - Nadeel</title>
        <meta name="description" content="Review your selected luxury fragrances and proceed to checkout." />
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
              Shopping cart
            </h1>

            {cart.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card>
                    <CardContent className="p-6">
                      {cart.map((item) => (
                        <CartItemRow
                          key={item.product.id}
                          item={item}
                          updateQuantity={updateQuantity}
                          removeFromCart={removeFromCart}
                        />
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-1">
                  <Card className="sticky top-24 luxury-shadow-lg">
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-6">
                        Order summary
                      </h2>
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span className="font-medium">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tax (8%)</span>
                          <span className="font-medium">${tax.toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg">
                          <span className="font-semibold">Total</span>
                          <span className="font-bold font-heading">
                            ${total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <Link to="/checkout">
                        <Button size="lg" className="w-full transition-all duration-200 hover:gap-3 active:scale-95">
                          Proceed to checkout
                          <ArrowRight className="w-5 h-5 ml-2 transition-all" />
                        </Button>
                      </Link>
                      <Link to="/products">
                        <Button variant="outline" size="lg" className="w-full mt-3 transition-all duration-200 active:scale-95">
                          Continue shopping
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  Your cart is empty
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Start shopping to add items to your cart
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

export default CartPage;