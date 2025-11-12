import { Link } from 'react-router-dom';
import { ShoppingCart, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { api } from '@/lib/api';

interface Product {
  id: string;
  title?: string;
  name?: string;
  price: number;
  images?: string[];
  image?: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
}

const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  const { addToCart } = useCart();
  const productName = product.title || product.name || '';
  const productImageObj = product.images?.[0] || product.image;
  const productImage = typeof productImageObj === 'string' 
    ? productImageObj 
    : (productImageObj as any)?.url || '';
  
  const handleAddToCart = async (e: React.MouseEvent) => {
  e.preventDefault();
  if (!product) return;

  try {
    // 1) Add a single item to cart
    await addToCart({
      id: String(product.id),
      name: productName,
      price: product.price,
      image: productImage,
    }, 1); // explicitly send quantity = 1

    // 2) Decrease stock by 1 in inventory service
    await api.adjustStock(product.id, -1);

    toast.success('Added to cart and stock updated');
  } catch (error) {
    console.error(error);
    toast.error('Failed to add to cart / update stock');
  }
};


  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    onEdit?.(product);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    onDelete?.(product.id);
  };

  return (
    <Link to={`/products/${product.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={productImage}
            alt={productName}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold line-clamp-2 mb-2">{productName}</h3>
          <p className="text-2xl font-bold text-primary">₹{product.price.toFixed(2)}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex-col gap-2">
          <Button onClick={handleAddToCart} className="w-full" size="sm">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          {(onEdit || onDelete) && (
            <div className="flex gap-2 w-full">
              {onEdit && (
                <Button onClick={handleEdit} variant="outline" className="flex-1" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button onClick={handleDelete} variant="destructive" className="flex-1" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              )}
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
