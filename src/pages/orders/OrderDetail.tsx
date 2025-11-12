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
    if (id) loadOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      const data = await api.getOrder(id!);
      setOrder(data ?? null);
    } catch (error) {
      console.error('Failed to load order:', error);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const safeDate = (iso?: string) => {
    if (!iso) return 'Unknown date';
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? 'Unknown date' : d.toLocaleDateString();
  };

  const getProducts = (o: any) => {
    if (!o) return [];
    if (Array.isArray(o.products)) return o.products;
    if (Array.isArray(o.orderItems)) return o.orderItems;
    if (Array.isArray(o.items)) return o.items;
    return [];
  };

  const getProductDetails = (p: any) => {
    // product item might be an embedded product or simple object
    const prod = p.product ?? p;
    return {
      id: prod?.id ?? p?.id ?? '',
      title: prod?.title ?? prod?.name ?? p?.title ?? p?.name ?? 'Unknown',
      images: prod?.images ?? prod?.image ? prod?.images ?? [prod?.image] : [],
      price: Number(prod?.price ?? p?.price ?? 0),
      quantity: p.quantity ?? p.itemCount ?? p.count ?? 1,
    };
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

  const products = getProducts(order);
  const shipping = order.shippingDetails ?? order.shipping ?? order.address ?? null;
  const payment = order.paymentStatus ?? order.payment ?? null;
  const total = Number(order.grandTotal ?? order.totalPrice ?? order.total ?? 0);

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
                      <CardTitle>Order #{order.id ?? order._id}</CardTitle>
                      <Badge>{order.deliveryStatus ?? order.status ?? 'unknown'}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Placed on {safeDate(order.createdAt)}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {products.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No products in this order.</p>
                    ) : (
                      products.map((item: any, idx: number) => {
                        const p = getProductDetails(item);
                        return (
                          <div key={p.id || idx} className="flex gap-4 pb-4 border-b last:border-0">
                            <img
                              src={p.images?.[0]?.url ?? p.images?.[0] ?? ''}
                              alt={p.title}
                              className="w-20 h-20 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold">{p.title}</h3>
                              <p className="text-sm text-muted-foreground">Quantity: {p.quantity}</p>
                              <p className="font-semibold text-primary">₹{p.price.toFixed(2)}</p>
                            </div>
                          </div>
                        );
                      })
                    )}
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
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-1">
                    <p><strong>Name:</strong> {shipping?.name ?? '—'}</p>
                    <p><strong>Email:</strong> {shipping?.email ?? '—'}</p>
                    <p><strong>Phone:</strong> {shipping?.phone ?? '—'}</p>
                    <p><strong>Address:</strong> {shipping?.address ?? '—'}</p>
                    <p><strong>Payment:</strong> {payment?.payType ?? payment?.status ?? '—'}</p>
                    {payment?.transactionId && <p className="text-xs text-muted-foreground">Txn: {payment.transactionId}</p>}
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
