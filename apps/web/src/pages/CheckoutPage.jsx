import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useCart } from '@/hooks/useCart.js';
import { apiRequest } from '@/lib/api.js';
import { toast } from 'sonner';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, getTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const subtotal = getTotal();
  const tax = subtotal * 0.08;
  const shipping = 12.00;
  const total = subtotal + tax + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('nadeel_token');
    if (!token) {
      toast.error('Please login to place an order');
      setLoading(false);
      navigate('/login');
      return;
    }

    try {
      await apiRequest('/orders/checkout', { method: 'POST' });
      clearCart();
      toast.success('Order placed successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Checkout - Nadeel</title>
        <meta name="description" content="Complete your purchase of luxury fragrances from Nadeel." />
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
              Checkout
            </h1>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Shipping information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First name</Label>
                          <Input id="firstName" required className="mt-1 text-foreground placeholder:text-muted-foreground" />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last name</Label>
                          <Input id="lastName" required className="mt-1 text-foreground placeholder:text-muted-foreground" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" required className="mt-1 text-foreground placeholder:text-muted-foreground" />
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" required className="mt-1 text-foreground placeholder:text-muted-foreground" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input id="city" required className="mt-1 text-foreground placeholder:text-muted-foreground" />
                        </div>
                        <div>
                          <Label htmlFor="zipCode">ZIP code</Label>
                          <Input id="zipCode" required className="mt-1 text-foreground placeholder:text-muted-foreground" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Payment information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" required className="mt-1 text-foreground placeholder:text-muted-foreground" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry date</Label>
                          <Input id="expiry" placeholder="MM/YY" required className="mt-1 text-foreground placeholder:text-muted-foreground" />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" required className="mt-1 text-foreground placeholder:text-muted-foreground" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-1">
                  <Card className="sticky top-24 luxury-shadow-lg">
                    <CardHeader>
                      <CardTitle>Order summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {cart.map((item) => (
                          <div key={item.product.id} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {item.product.name} × {item.quantity}
                            </span>
                            <span className="font-medium">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span className="font-medium">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Tax (8%)</span>
                          <span className="font-medium">${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Shipping</span>
                          <span className="font-medium">${shipping.toFixed(2)}</span>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold font-heading">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full transition-all duration-200 active:scale-95"
                        disabled={loading}
                      >
                        {loading ? 'Processing...' : 'Place order'}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </motion.div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default CheckoutPage;