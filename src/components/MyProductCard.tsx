import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface Product {
  id: string;
  title?: string;
  name?: string;
  price: number;
  images?: string[];
  image?: string;
  description?: string;
}

interface MyProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

const MyProductCard = ({ product, onEdit, onDelete }: MyProductCardProps) => {
  const productName = product.title || product.name || '';
  const productImageObj = product.images?.[0] || product.image;
  const productImage = typeof productImageObj === 'string' 
    ? productImageObj 
    : (productImageObj as any)?.url || '';
  
  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(product);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(product.id);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={productImage}
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold line-clamp-2 mb-2">{productName}</h3>
        <p className="text-2xl font-bold text-primary">₹{product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button onClick={handleEdit} variant="outline" className="flex-1" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button onClick={handleDelete} variant="destructive" className="flex-1" size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MyProductCard;
