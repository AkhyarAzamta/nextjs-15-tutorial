import { Request, Response } from 'express';
import { mockUsers } from '../data/mockData';
import { ApiResponse } from '../types';

export const getUsers = (req: Request, res: Response) => {
  try {
    const response: ApiResponse<typeof mockUsers> = {
      success: true,
      data: mockUsers
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users'
    });
  }
};

export const getUserById = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = mockUsers.find(u => u.id === id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const response: ApiResponse<typeof user> = {
      success: true,
      data: user
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user'
    });
  }
};
