import express from 'express';
import { getProducts, getProductById, getProductReviews, createProductReview } from '../controllers/productController';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/:id/reviews', getProductReviews);
router.post('/:id/reviews', createProductReview);

export default router;
