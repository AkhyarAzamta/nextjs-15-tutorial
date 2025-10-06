"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUsers = void 0;
const mockData_1 = require("../data/mockData");
const getUsers = (req, res) => {
    try {
        const response = {
            success: true,
            data: mockData_1.mockUsers
        };
        res.json(response);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch users'
        });
    }
};
exports.getUsers = getUsers;
const getUserById = (req, res) => {
    try {
        const { id } = req.params;
        const user = mockData_1.mockUsers.find(u => u.id === id);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        const response = {
            success: true,
            data: user
        };
        res.json(response);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch user'
        });
    }
};
exports.getUserById = getUserById;
//# sourceMappingURL=userController.js.map