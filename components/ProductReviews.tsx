'use client';

import { useState, useEffect } from 'react';
import { Review } from '@/types';

interface ProductReviewsProps {
  productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);

  // 🎯 CSR: Fetch dari external API
  useEffect(() => {
    async function loadReviews() {
      try {
        const response = await fetch(`http://localhost:3001/api/products/${productId}/reviews`);
        const data = await response.json();
        setReviews(data.data);
      } catch (error) {
        console.error('Failed to load reviews:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadReviews();
  }, [productId]);

  // 🎯 CSR: Add new review ke external API
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReview.trim()) return;
    
    const reviewToAdd = {
      rating,
      comment: newReview,
      userName: 'Current User'
    };
    
    try {
      const response = await fetch(`http://localhost:3001/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewToAdd),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setReviews(prev => [result.data, ...prev]);
        setNewReview('');
        setRating(5);
      }
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading reviews from external API...</div>;
  }

  return (
    <div className="card">
      <form onSubmit={handleSubmitReview} style={{ marginBottom: '2rem' }}>
        <h4>Add Your Review (External API)</h4>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Rating: 
            <select 
              value={rating} 
              onChange={(e) => setRating(Number(e.target.value))}
              style={{ marginLeft: '0.5rem' }}
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num} ⭐</option>
              ))}
            </select>
          </label>
        </div>
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write your review..."
          rows={3}
          style={{ 
            width: '100%', 
            padding: '0.5rem',
            marginBottom: '1rem',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
        <button 
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            background: '#007acc',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Submit Review to External API
        </button>
      </form>

      <div>
        <h4>Customer Reviews from External API ({reviews.length})</h4>
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map(review => (
            <div key={review.id} style={{ 
              borderBottom: '1px solid #eee', 
              padding: '1rem 0',
              marginBottom: '1rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <strong>{review.userName}</strong>
                <span>{'⭐'.repeat(review.rating)}</span>
              </div>
              <p>{review.comment}</p>
              <small style={{ color: '#666' }}>
                {new Date(review.date).toLocaleDateString()}
              </small>
            </div>
          ))
        )}
      </div>
      <p><em>This section uses external Express API at localhost:3001</em></p>
    </div>
  );
}
