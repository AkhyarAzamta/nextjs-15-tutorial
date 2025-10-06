import { NextRequest, NextResponse } from 'next/server';
import { Review } from '@/types';

// Simulate database
let reviews: Review[] = [
  {
    id: '1',
    user: 'Alice Johnson',
    rating: 5,
    comment: 'Excellent product! Highly recommended.',
    date: new Date('2024-01-15').toISOString()
  },
  {
    id: '2',
    user: 'Bob Smith',
    rating: 4,
    comment: 'Good quality but a bit expensive.',
    date: new Date('2024-01-14').toISOString()
  }
];

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  await new Promise(resolve => setTimeout(resolve, 300));
  return NextResponse.json(reviews);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const newReview: Review = await request.json();
  
  reviews = [newReview, ...reviews];
  
  return NextResponse.json({ success: true });
}
