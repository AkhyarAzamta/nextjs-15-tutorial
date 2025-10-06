"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductReview = exports.getProductReviews = exports.getProductById = exports.getProducts = void 0;
const mockData_1 = require("../data/mockData");
const getProducts = (req, res) => {
    try {
        const response = {
            success: true,
            data: mockData_1.mockProducts,
            message: 'Products fetched successfully'
        };
        res.json(response);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch products'
        });
    }
};
exports.getProducts = getProducts;
const getProductById = (req, res) => {
    try {
        const { id } = req.params;
        const product = mockData_1.mockProducts.find(p => p.id === id);
        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }
        const response = {
            success: true,
            data: product
        };
        res.json(response);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch product'
        });
    }
};
exports.getProductById = getProductById;
const getProductReviews = (req, res) => {
    try {
        const { id } = req.params;
        const productReviews = mockData_1.mockReviews.filter(review => review.productId === id);
        const response = {
            success: true,
            data: productReviews
        };
        res.json(response);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch product reviews'
        });
    }
};
exports.getProductReviews = getProductReviews;
const createProductReview = (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment, userName } = req.body;
        if (!rating || !comment || !userName) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }
        const newReview = {
            id: Date.now().toString(),
            productId: id,
            userId: 'temp-user',
            userName,
            rating: Number(rating),
            comment,
            date: new Date().toISOString()
        };
        mockData_1.mockReviews.unshift(newReview);
        const response = {
            success: true,
            data: newReview,
            message: 'Review created successfully'
        };
        res.status(201).json(response);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to create review'
        });
    }
};
exports.createProductReview = createProductReview;
//# sourceMappingURL=productController.js.map