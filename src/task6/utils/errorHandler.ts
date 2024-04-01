import { Request, Response, NextFunction } from 'express';
import sendResponse from './sendResponse';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  if (err) {
    sendResponse(res, 500, null, err.message || 'Internal Server error');
  }
}
