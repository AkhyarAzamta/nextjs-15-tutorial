import { Request, Response } from 'express';
import { mockProducts, mockReviews } from '../data/mockData';
import { ApiResponse, Review } from '../types';

export const getProducts = (req: Request, res: Response) => {
  try {
    const response: ApiResponse<typeof mockProducts> = {
      success: true,
      data: mockProducts,
      message: 'Products fetched successfully'
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products'
    });
  }
};

export const getProductById = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = mockProducts.find(p => p.id === id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    const response: ApiResponse<typeof product> = {
      success: true,
      data: product
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch product'
    });
  }
};

export const getProductReviews = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productReviews = mockReviews.filter(review => review.productId === id);

    const response: ApiResponse<typeof productReviews> = {
      success: true,
      data: productReviews
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch product reviews'
    });
  }
};

export const createProductReview = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rating, comment, userName } = req.body;

    if (!rating || !comment || !userName) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    const newReview: Review = {
      id: Date.now().toString(),
      productId: id,
      userId: 'temp-user',
      userName,
      rating: Number(rating),
      comment,
      date: new Date().toISOString()
    };

    mockReviews.unshift(newReview);

    const response: ApiResponse<Review> = {
      success: true,
      data: newReview,
      message: 'Review created successfully'
    };
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create review'
    });
  }
};
