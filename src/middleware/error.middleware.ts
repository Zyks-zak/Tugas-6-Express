import { type Request, type Response, type NextFunction } from 'express';

export type ErrorRequestHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => void;

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message
    });
};
