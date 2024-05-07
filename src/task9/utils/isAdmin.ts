import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../user/user.entity';

type RequestHeaderValue = string | string[] | undefined;

interface RequestWithHeaders extends Request {
  headers: {
    [key: string]: RequestHeaderValue;
  };
  user?: UserModel;
}

export const isAdmin = async (req: RequestWithHeaders, res: Response, next: NextFunction): Promise<void> => {
  const currentUser: UserModel | undefined = req.user;

  if (currentUser?.role !== 'admin') {
    res.status(403).send({
      error: 'You are not allowed to access this route',
    });
    return;
  }
  next();
};
