// API client for microservices
// Replace these base URLs with your actual microservice endpoints

const API_BASE = {
  auth: '/api/auth',
  product: '/api/product',
  cart: '/api/cart',
  order: '/api/order',
};

// Mock data for demo purposes
export const mockProducts = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    description: 'High-quality wireless headphones with noise cancellation',
    category: 'Electronics',
    stock: 50,
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    description: 'Advanced smartwatch with health tracking features',
    category: 'Electronics',
    stock: 30,
  },
  {
    id: '3',
    name: 'Designer Backpack',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    description: 'Stylish and functional backpack for everyday use',
    category: 'Fashion',
    stock: 100,
  },
  {
    id: '4',
    name: 'Laptop Stand',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    description: 'Ergonomic laptop stand for better posture',
    category: 'Accessories',
    stock: 75,
  },
  {
    id: '5',
    name: 'Wireless Keyboard',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
    description: 'Mechanical wireless keyboard with RGB lighting',
    category: 'Electronics',
    stock: 60,
  },
  {
    id: '6',
    name: 'USB-C Hub',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
    description: 'Multi-port USB-C hub with HDMI and SD card reader',
    category: 'Accessories',
    stock: 120,
  },
];

// API functions to be implemented with actual microservice calls
export const api = {
  // Product API
  getProducts: async () => {
    const response = await fetch('http://localhost:8080/api/product');
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  getProduct: async (id: string) => {
    const response = await fetch(`http://localhost:8080/api/product/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  createProduct: async (formData: FormData) => {
    const response = await fetch('http://localhost:8080/api/product', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  },

  updateProduct: async (id: string, formData: FormData) => {
    const response = await fetch(`http://localhost:8080/api/product/${id}`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  },

  deleteProduct: async (id: string) => {
    const response = await fetch(`http://localhost:8080/api/product/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete product');
    return response.json();
  },

  // Cart API
  getCart: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8080/api/cart', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch cart');
    return response.json();
  },

  addToCart: async (productId: string, quantity: number) => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8080/api/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, itemCount: quantity }),
    });
    if (!response.ok) throw new Error('Failed to add to cart');
    return response.json();
  },

  increaseCartItem: async (productId: string) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/api/cart/increase/${productId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to increase cart item');
    return response.json();
  },

  decreaseCartItem: async (productId: string) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/api/cart/decrease/${productId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to decrease cart item');
    return response.json();
  },

  removeFromCart: async (productId: string) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/api/cart/remove/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to remove from cart');
    return response.json();
  },

  clearCart: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8080/api/cart/remove', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to clear cart');
    return response.json();
  },

  // Order API
  createOrder: async (orderData: any) => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8080/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  },

  getOrders: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8080/api/order', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },

  getOrder: async (id: string) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/api/order/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch order');
    return response.json();
  },

  deleteOrder: async (id: string) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/api/order/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to delete order');
    return response.json();
  },
};
