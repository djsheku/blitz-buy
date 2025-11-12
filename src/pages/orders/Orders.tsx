import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { api } from '@/lib/api';

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await api.getOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (iso?: string) => {
    if (!iso) return 'Unknown date';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return 'Unknown date';
    return d.toLocaleDateString();
  };

  const getStatusColor = (status?: string) => {
    switch ((status || '').toLowerCase()) {
      case 'delivered':
        return 'default';
      case 'pending':
      case 'processing':
        return 'secondary';
      case 'canceled':
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const itemsCount = (order: any) => {
    if (Array.isArray(order.products)) return order.products.length;
    return 0;
  };

  const itemsPreview = (order: any) => {
    if (!Array.isArray(order.products)) return [];
    return order.products.slice(0, 3).map((p: any) => p.title ?? p.name ?? p.productTitle ?? '').filter(Boolean);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">
          <div className="container py-8">
            <h1 className="text-4xl font-bold mb-8">My Orders</h1>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
                <p className="text-muted-foreground mb-4">Start shopping to see your orders here</p>
                <Link to="/store">
                  <Button>Browse Products</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4 max-w-3xl">
                {orders.map((order) => (
                  <Link key={order.id ?? order._id} to={`/orders/${order.id ?? order._id}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">Order #{order.id ?? order._id}</h3>
                              <Badge variant={getStatusColor(order.deliveryStatus ?? order.status)}>
                                {order.deliveryStatus ?? order.status ?? 'unknown'}
                              </Badge>
                            </div>

                            <p className="text-sm text-muted-foreground">
                              Placed on {formatDate(order.createdAt)}
                            </p>

                            <p className="text-sm text-muted-foreground">
                              {itemsCount(order)} {itemsCount(order) === 1 ? 'item' : 'items'}
                              {itemsCount(order) > 0 && ` — ${itemsPreview(order).join(', ')}${itemsCount(order) > 3 ? '...' : ''}`}
                            </p>

                            <p className="text-sm text-muted-foreground">
                              {order.shippingDetails
                                ? `${order.shippingDetails.name ?? ''}`.trim()
                                : 'No shipping info'}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">
                              ₹{Number(order.grandTotal ?? order.totalPrice ?? order.total ?? 0).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Orders;
