import { Suspense } from 'react';
import ProductDetails from '@/components/ProductDetails';
import ProductReviews from '@/components/ProductReviews';
import RealTimeInventory from '@/components/RealTimeInventory';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Product } from '@/types';

// 🎯 SSG/ISR: Generate static paths
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' }
  ];
}

// 🎯 SSR: Fetch dari external API
async function getProduct(productId: string): Promise<Product> {
  const res = await fetch(`http://localhost:3001/api/products/${productId}`, {
    next: { 
      revalidate: 3600, // ISR: Revalidate setiap 1 jam
    }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  
  const data = await res.json();
  return data.data; // Ambil data dari response API
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div className="container">
      <h1>🔄 Hybrid Rendering with External API</h1>
      <div className="card">
        <p><strong>Product ID:</strong> {id}</p>
        <p><strong>API Source:</strong> External Express Server (localhost:3001)</p>
        <p><strong>Rendered at:</strong> {new Date().toLocaleTimeString()}</p>
      </div>
      
      <section>
        <h2>📄 Product Details (SSR/ISR + External API)</h2>
        <ProductDetails product={product} />
      </section>
      
      <section>
        <h2>💬 Product Reviews (CSR + External API)</h2>
        <Suspense fallback={<LoadingSpinner text="Loading reviews..." />}>
          <ProductReviews productId={id} />
        </Suspense>
      </section>
      
      <section>
        <h2>📦 Real-time Inventory (WebSocket)</h2>
        <Suspense fallback={<LoadingSpinner text="Connecting to inventory..." />}>
          <RealTimeInventory productId={id} />
        </Suspense>
      </section>
    </div>
  );
}
