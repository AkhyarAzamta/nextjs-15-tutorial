export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface DashboardData {
  user: User;
  stats: {
    posts: number;
    views: number;
    likes: number;
  };
  recentActivity: Array<{
    id: string;
    action: string;
    date: string;
  }>;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  features: string[];
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}
