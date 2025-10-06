import { Suspense } from 'react';
import ProductDetails from '@/components/ProductDetails';
import ProductReviews from '@/components/ProductReviews';
import RealTimeInventory from '@/components/RealTimeInventory';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Product } from '@/types';

// 🎯 SSG/ISR: Generate static paths untuk produk populer
export async function generateStaticParams() {
  // Dalam real app, ini fetch dari API
  const popularProducts = [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ];
  
  return popularProducts;
}

// 🎯 SSR: Fetch data product di server side
async function getProduct(productId: string): Promise<Product> {
  console.log('🔵 Fetching product data via SSR:', productId);
  
  // Simulate API call dengan cache control
  const res = await fetch(`http://localhost:3000/api/products/${productId}`, {
    next: { 
      revalidate: 3600, // ISR: Revalidate setiap 1 jam
      tags: ['products'] // Untuk on-demand revalidation
    }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  
  return res.json();
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // 🎯 Handle async params di Next.js 15
  const { id } = await params;
  
  // 🎯 SSR: Data product di-fetch di server
  const product = await getProduct(id);
  
  return (
    <div className="container">
      <h1>🔄 Hybrid Rendering Product Page</h1>
      <div className="card">
        <p><strong>Product ID:</strong> {id}</p>
        <p><strong>Rendered at:</strong> {new Date().toLocaleTimeString()}</p>
      </div>
      
      {/* 🎯 SSG/ISR: Static product details */}
      <section>
        <h2>📄 Product Details (SSR/ISR)</h2>
        <ProductDetails product={product} />
      </section>
      
      {/* 🎯 CSR: Client-side reviews dengan loading state */}
      <section>
        <h2>💬 Product Reviews (CSR)</h2>
        <Suspense fallback={<LoadingSpinner text="Loading reviews..." />}>
          <ProductReviews productId={id} />
        </Suspense>
      </section>
      
      {/* 🎯 Real-time: WebSocket inventory */}
      <section>
        <h2>📦 Real-time Inventory (WebSocket)</h2>
        <Suspense fallback={<LoadingSpinner text="Connecting to inventory..." />}>
          <RealTimeInventory productId={id} />
        </Suspense>
      </section>
    </div>
  );
}
