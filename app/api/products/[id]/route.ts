import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@/types';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  
  // Simulate database fetch
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const product: Product = {
    id: params.id,
    name: `Product ${params.id}`,
    price: Math.floor(Math.random() * 100) + 10,
    description: `This is a description for product ${params.id}. It has amazing features and great quality.`,
    category: ['Electronics', 'Books', 'Clothing'][Math.floor(Math.random() * 3)],
    features: [
      'High Quality',
      'Durable',
      'Eco Friendly',
      '1 Year Warranty'
    ]
  };

  return NextResponse.json(product);
}
