import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, ArrowLeft, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await api.getProduct(id!);
        setProduct(data);
        console.log(product);
      } catch (error) {
        toast.error('Failed to load product');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.title || product.name,
        price: product.price,
        image: product.images?.[0] || product.image,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading product...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Link to="/store">
              <Button>Back to Store</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const productName = product.title || product.name;
  const productImageObj = product.images?.[0] || product.image;
  const productImage = typeof productImageObj === 'string' 
    ? productImageObj 
    : (productImageObj as any)?.url || '';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container py-8">
          <Link to="/store">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Store
            </Button>
          </Link>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={productImage}
                alt={productName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6">
              <div>
                {product.category && <Badge className="mb-2">{product.category}</Badge>}
                <h1 className="text-4xl font-bold mb-2">{productName}</h1>
                <p className="text-3xl font-bold text-primary">₹{product.price.toFixed(2)}</p>
                {product.discount > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {product.discount}% discount available
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <h2 className="font-semibold">Description</h2>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              <div className="space-y-2">
                <h2 className="font-semibold">Availability</h2>
                <Badge variant={product.stock > 0 ? 'default' : 'destructive'}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-semibold">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
