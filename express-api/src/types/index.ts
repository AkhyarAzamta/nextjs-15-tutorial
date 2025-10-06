export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  features: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
