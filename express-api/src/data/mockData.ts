import { Product, User, Review } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'MacBook Pro 16"',
    price: 2499,
    description: 'Powerful laptop for professionals with M3 chip',
    category: 'Electronics',
    features: ['M3 Chip', '16GB RAM', '1TB SSD', 'Retina Display'],
    inStock: true,
    rating: 4.8,
    reviewCount: 124,
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    name: 'iPhone 15 Pro',
    price: 999,
    description: 'Latest iPhone with titanium design',
    category: 'Electronics',
    features: ['Titanium Design', 'A17 Pro Chip', '5G', '48MP Camera'],
    inStock: true,
    rating: 4.6,
    reviewCount: 89,
    images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400'],
    createdAt: '2024-01-14T00:00:00Z',
    updatedAt: '2024-01-14T00:00:00Z'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'user',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
    role: 'admin',
    createdAt: '2024-01-02T00:00:00Z'
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userId: '1',
    userName: 'John Doe',
    rating: 5,
    comment: 'Amazing laptop! The performance is incredible.',
    date: '2024-01-16T10:30:00Z'
  },
  {
    id: '2',
    productId: '1',
    userId: '2',
    userName: 'Jane Smith',
    rating: 4,
    comment: 'Great machine but a bit heavy for travel.',
    date: '2024-01-15T14:20:00Z'
  }
];
