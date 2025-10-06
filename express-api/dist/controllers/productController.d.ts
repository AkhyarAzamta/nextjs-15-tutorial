import { Request, Response } from 'express';
export declare const getProducts: (req: Request, res: Response) => void;
export declare const getProductById: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
export declare const getProductReviews: (req: Request, res: Response) => void;
export declare const createProductReview: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=productController.d.ts.map