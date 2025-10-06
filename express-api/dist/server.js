"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const products_1 = __importDefault(require("./routes/products"));
const users_1 = __importDefault(require("./routes/users"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
}));
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json());
// Routes
app.use('/api/products', products_1.default);
app.use('/api/users', users_1.default);
// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'Express TypeScript API',
        version: '1.0.0'
    });
});
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl
    });
});
app.listen(PORT, () => {
    console.log(`🚀 Express API Server running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
//# sourceMappingURL=server.js.map