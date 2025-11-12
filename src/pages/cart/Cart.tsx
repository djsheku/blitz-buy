import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/lib/api'; // make sure this exports adjustStock and optionally placeOrder

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, clearCart, total, loading } = useCart();

  // while loading, avoid showing "Your cart is empty"
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
            <h2 className="text-2xl font-bold">Loading cart…</h2>
            <p className="text-muted-foreground">Fetching items from your cart.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <p className="text-muted-foreground">Add some products to get started!</p>
            <Link to="/store">
              <Button>Browse Products</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // local handlers that sync inventory
  const handleIncrease = async (item: any) => {
    try {
      // update cart
      await updateQuantity(item.id, item.quantity + 1);
      // decrement inventory by 1
      await api.adjustStock(item.id, -1);
    } catch (err) {
      console.error(err);
      toast.error('Failed to increase quantity');
    }
  };

  const handleDecrease = async (item: any) => {
    try {
      // if next quantity would be zero, updateQuantity will remove the item
      await updateQuantity(item.id, item.quantity - 1);
      // increment inventory by 1
      await api.adjustStock(item.id, 1);
    } catch (err) {
      console.error(err);
      toast.error('Failed to decrease quantity');
    }
  };

  const handleRemove = async (item: any) => {
    try {
      // remove from cart
      await removeFromCart(item.id);
      // return its quantity back to inventory
      await api.adjustStock(item.id, Number(item.quantity));
    } catch (err) {
      console.error(err);
      toast.error('Failed to remove item');
    }
  };

  // Attempt to place order. If a placeOrder API exists, use it; otherwise fall back to adjusting stock and clearing cart.
 const handlePlaceOrder = async () => {
  try {
    navigate('/checkout'); // just go to checkout page
  } catch (err) {
    console.error(err);
    toast.error('Failed to proceed to checkout');
  }
};

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="container py-8">
          <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-lg font-bold text-primary mt-1">
                          ₹{item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleDecrease(item)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-12 text-center font-semibold">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleIncrease(item)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 ml-auto text-destructive"
                            onClick={() => handleRemove(item)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <Card className="sticky top-20">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-bold">Order Summary</h2>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">₹{total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-semibold">Free</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Proceed: attempt to place order then navigate */}
                  <Button className="w-full" size="lg" onClick={handlePlaceOrder}>
                    Proceed to Checkout
                  </Button>

                  <Link to="/store" className="block">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
