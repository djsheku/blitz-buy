import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      const cartData = await api.getCart();
      if (cartData && cartData.cartItems) {
        const mappedItems = cartData.cartItems.map((item: any) => ({
          id: item.product.id.toString(),
          name: item.product.title,
          price: item.product.price,
          quantity: item.itemCount,
          image: item.product.images?.[0]?.url || item.product.images?.[0] || '',
        }));
        setItems(mappedItems);
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product: Omit<CartItem, 'quantity'>) => {
    try {
      await api.addToCart(product.id, 1);
      await loadCart();
      toast.success('Added to cart');
    } catch (error) {
      toast.error('Failed to add to cart');
      console.error(error);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      await api.removeFromCart(productId);
      setItems((prev) => prev.filter((item) => item.id !== productId));
      toast.success('Removed from cart');
    } catch (error) {
      toast.error('Failed to remove from cart');
      console.error(error);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    const currentItem = items.find((item) => item.id === productId);
    if (!currentItem) return;

    try {
      if (quantity > currentItem.quantity) {
        await api.increaseCartItem(productId);
      } else {
        await api.decreaseCartItem(productId);
      }
      await loadCart();
    } catch (error) {
      toast.error('Failed to update cart');
      console.error(error);
    }
  };

  const clearCart = async () => {
    try {
      await api.clearCart();
      setItems([]);
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
