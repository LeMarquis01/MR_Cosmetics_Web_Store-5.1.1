export interface Product {
  id: string;
  name: string;
  category: 'Skincare' | 'Haircare' | 'Body' | 'Fragrance' | 'Wellness';
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  specs: Record<string, string>;
  stock: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  loyaltyPoints: number;
  avatar?: string;
  addresses: string[];
}

export interface Order {
  id: string;
  date: string;
  items: (CartItem & { name: string, price: number })[];
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
}
