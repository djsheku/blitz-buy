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
    // TODO: Replace with actual API call to GET /api/product
    return mockProducts;
  },

  getProduct: async (id: string) => {
    // TODO: Replace with actual API call to GET /api/product/{id}
    return mockProducts.find(p => p.id === id);
  },

  createProduct: async (product: any) => {
    // TODO: Replace with actual API call to POST /api/product
    console.log('Creating product:', product);
    return product;
  },

  updateProduct: async (id: string, product: any) => {
    // TODO: Replace with actual API call to PUT /api/product/{id}
    console.log('Updating product:', id, product);
    return product;
  },

  // Cart API
  getCart: async () => {
    // TODO: Replace with actual API call to GET /api/cart
    return [];
  },

  addToCart: async (productId: string, quantity: number) => {
    // TODO: Replace with actual API call to POST /api/cart
    console.log('Adding to cart:', productId, quantity);
  },

  updateCartItem: async (productId: string, quantity: number) => {
    // TODO: Replace with actual API call to PUT /api/cart/{productId}
    console.log('Updating cart item:', productId, quantity);
  },

  removeFromCart: async (productId: string) => {
    // TODO: Replace with actual API call to DELETE /api/cart/{productId}
    console.log('Removing from cart:', productId);
  },

  // Order API
  createOrder: async (orderData: any) => {
    // TODO: Replace with actual API call to POST /api/order
    console.log('Creating order:', orderData);
    return { id: Date.now().toString(), ...orderData };
  },

  getOrders: async () => {
    // TODO: Replace with actual API call to GET /api/order
    return [];
  },

  getOrder: async (id: string) => {
    // TODO: Replace with actual API call to GET /api/order/{id}
    return null;
  },
};
