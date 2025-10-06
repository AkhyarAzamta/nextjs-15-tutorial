"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const router = express_1.default.Router();
router.get('/', productController_1.getProducts);
router.get('/:id', productController_1.getProductById);
router.get('/:id/reviews', productController_1.getProductReviews);
router.post('/:id/reviews', productController_1.createProductReview);
exports.default = router;
//# sourceMappingURL=products.js.map