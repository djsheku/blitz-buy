import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: any;
  onSuccess: () => void;
}

const ProductFormDialog = ({ open, onOpenChange, product, onSuccess }: ProductFormDialogProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    discount: '',
    stock: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        discount: product.discount?.toString() || '',
        stock: product.stock?.toString() || '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        price: '',
        discount: '',
        stock: '',
      });
      setImageFile(null);
    }
  }, [product, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      if (imageFile) {
        formDataToSend.append('images', imageFile);
      }
      
      if (formData.title) formDataToSend.append('title', formData.title);
      if (formData.description) formDataToSend.append('description', formData.description);
      if (formData.price) formDataToSend.append('price', formData.price);
      if (formData.discount) formDataToSend.append('discount', formData.discount);
      if (formData.stock) formDataToSend.append('stock', formData.stock);

      const url = product
        ? `http://localhost:8080/api/product/${product.id}`
        : 'http://localhost:8080/api/product';

      const response = await fetch(url, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) throw new Error('Failed to save product');

      toast.success(product ? 'Product updated successfully' : 'Product created successfully');
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to save product');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required={!product}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required={!product}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required={!product}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount">Discount (%)</Label>
              <Input
                id="discount"
                type="number"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              required={!product}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Product Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              required={!product}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : product ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;
