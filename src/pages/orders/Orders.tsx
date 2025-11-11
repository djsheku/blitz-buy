import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

// Mock orders data
const mockOrders = [
  {
    id: '1',
    date: '2024-01-15',
    total: 299.99,
    status: 'delivered',
    items: 3,
  },
  {
    id: '2',
    date: '2024-01-20',
    total: 149.98,
    status: 'shipped',
    items: 2,
  },
];

const Orders = () => {
  // TODO: Replace with actual API call to GET /api/order
  const orders = mockOrders;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'default';
      case 'shipped':
        return 'secondary';
      case 'processing':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          <div className="container py-8">
            <h1 className="text-4xl font-bold mb-8">My Orders</h1>

            {orders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
                <p className="text-muted-foreground mb-4">Start shopping to see your orders here</p>
                <Link to="/products">
                  <Button>Browse Products</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4 max-w-3xl">
                {orders.map((order) => (
                  <Link key={order.id} to={`/orders/${order.id}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">Order #{order.id}</h3>
                              <Badge variant={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Placed on {new Date(order.date).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {order.items} {order.items === 1 ? 'item' : 'items'}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">
                              ${order.total.toFixed(2)}
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
