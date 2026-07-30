import { type Request, type Response, type NextFunction } from 'express';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers['authorization'] !== 'rahasia') {
        const err: any = new Error('Unauthorized');
        err.statusCode = 401;
        return next(err);
    }
    next();
};
