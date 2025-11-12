import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { api } from '@/lib/api';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadOrder();
    }
  }, [id]);

  const loadOrder = async () => {
    try {
      const data = await api.getOrder(id!);
      setOrder(data);
    } catch (error) {
      console.error('Failed to load order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 flex items-center justify-center">
            <p>Loading...</p>
          </main>
          <Footer />
        </div>
      </ProtectedRoute>
    );
  }

  if (!order) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 flex items-center justify-center">
            <p>Order not found</p>
          </main>
          <Footer />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          <div className="container py-8">
            <Link to="/orders">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Orders
              </Button>
            </Link>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Order #{order.id}</CardTitle>
                      <Badge>{order.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {order.orderItems?.map((item: any) => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0">
                        <img
                          src={item.product?.images?.[0]?.url || item.product?.images?.[0] || ''}
                          alt={item.product?.title}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.product?.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.itemCount}
                          </p>
                          <p className="font-semibold text-primary">
                            ₹{item.product?.price?.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">₹{order.totalPrice?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-semibold">Free</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">₹{order.totalPrice?.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-1">
                    <p><strong>Name:</strong> {order.name}</p>
                    <p><strong>Email:</strong> {order.email}</p>
                    <p><strong>Phone:</strong> {order.phone}</p>
                    <p><strong>Address:</strong> {order.address}</p>
                    <p><strong>Payment:</strong> {order.payType}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default OrderDetail;
